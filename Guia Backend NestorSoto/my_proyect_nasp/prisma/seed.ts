import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant Principal',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      telephone: '123456789',
      tenantId: tenant.id,
      role: 'ADMIN',
    },
  });

  console.log('Seeding completado con éxito.');
  console.log({ tenant, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
