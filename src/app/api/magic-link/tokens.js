export const tokens = {
    async set(token, data, ttl, env) {
      await env.MAGIC_KV.put(`magic:${token}`, JSON.stringify(data), { expirationTtl: ttl });
    },
    async get(token, env) {
      const raw = await env.MAGIC_KV.get(`magic:${token}`);
      return raw ? JSON.parse(raw) : null;
    },
    async delete(token, env) {
      await env.MAGIC_KV.delete(`magic:${token}`);
    }
  };