// Compatibility client for the existing catalog controllers. Drizzle owns the
// schema and migrations; both clients use the same managed Netlify database.
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { getDatabase } = require("@netlify/database");

let client;
function getClient() {
    if (!client) {
        client = new PrismaClient({
            adapter: new PrismaPg({ connectionString: getDatabase().connectionString }),
            log: ['error'],
        });
    }
    return client;
}

module.exports = new Proxy({}, {
    get(_target, property) {
        // Module interop and promise detection must remain safe during builds.
        if (property === '__esModule') return false;
        if (property === 'then') return undefined;
        if (property === Symbol.toStringTag) return 'PrismaClient';
        const prisma = getClient();
        const value = prisma[property];
        return typeof value === 'function' ? value.bind(prisma) : value;
    },
});
