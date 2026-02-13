/**
 * Rate Limiting para endpoints API
 * Implementación simple en memoria (para desarrollo)
 * En producción, considera usar Redis o Vercel Edge Config
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// Almacenamiento en memoria (se limpia al reiniciar el servidor)
const rateLimitStore = new Map<string, RateLimitStore>();

// Limpiar entradas expiradas cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Verifica si una solicitud excede el límite de tasa
 * @param identifier Identificador único (IP, session_id, etc.)
 * @param maxRequests Número máximo de solicitudes
 * @param windowMs Ventana de tiempo en milisegundos
 * @returns true si está dentro del límite, false si excedió
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const stored = rateLimitStore.get(identifier);

  if (!stored || stored.resetTime < now) {
    // Nueva ventana de tiempo
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime,
    };
  }

  // Incrementar contador
  stored.count += 1;

  if (stored.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: stored.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - stored.count,
    resetTime: stored.resetTime,
  };
}

/**
 * Obtiene la IP del cliente desde el request
 */
export function getClientIP(request: Request): string {
  // Intentar obtener IP real (útil con proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback: usar un identificador genérico
  return "unknown";
}

/**
 * Rate limiting para endpoints API
 */
export function rateLimitAPI(
  request: Request,
  maxRequests: number = 100,
  windowMs: number = 60 * 1000 // 1 minuto por defecto
) {
  const ip = getClientIP(request);
  const result = checkRateLimit(`api:${ip}`, maxRequests, windowMs);

  if (!result.allowed) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.resetTime.toString(),
          },
        }
      ),
    };
  }

  return {
    allowed: true,
    headers: {
      "X-RateLimit-Limit": maxRequests.toString(),
      "X-RateLimit-Remaining": result.remaining.toString(),
      "X-RateLimit-Reset": result.resetTime.toString(),
    },
  };
}

/**
 * Rate limiting específico para login
 */
export function rateLimitLogin(
  request: Request,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
) {
  const ip = getClientIP(request);
  const result = checkRateLimit(`login:${ip}`, maxRequests, windowMs);

  if (!result.allowed) {
    return {
      allowed: false,
      error: "Too many login attempts. Please try again later.",
      retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
    };
  }

  return {
    allowed: true,
    remaining: result.remaining,
  };
}
