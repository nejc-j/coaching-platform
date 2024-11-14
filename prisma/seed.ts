const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed script...');

  // Step 1: Delete existing users and coach profiles
  await prisma.coach.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Existing users and coach profiles deleted.');

  // Step 2: Create users with coach profiles
  const coachesData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Basketball',
          description:
            'Experienced basketball coach with over 10 years of experience.',
          location: 'New York, NY',
          rating: 4.8,
          imageUrl: '/coach-images/image-male.png',
          availability: 2,
        },
      },
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Tennis',
          description: 'Professional tennis coach with 15 years of experience.',
          location: 'Los Angeles, CA',
          rating: 3.7,
          imageUrl: '/coach-images/image-female.png',
          availability: 3,
        },
      },
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Soccer',
          description:
            'Soccer coach with a passion for developing skills in young players.',
          location: 'Chicago, IL',
          rating: 2.9,
          imageUrl: '/coach-images/image-male.png',
          availability: 5,
        },
      },
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Swimming',
          description:
            'Olympic swimmer turned coach, specializing in freestyle.',
          location: 'San Francisco, CA',
          rating: 3.6,
          imageUrl: '/coach-images/image-female.png',
          availability: 0,
        },
      },
    },
    {
      firstName: 'Chris',
      lastName: 'Lee',
      email: 'chris.lee@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Baseball',
          description:
            'Former MLB player with 20 years of coaching experience.',
          location: 'Houston, TX',
          rating: 3.5,
          imageUrl: '/coach-images/image-male.png',
          availability: 0,
        },
      },
    },
    {
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Volleyball',
          description: 'University volleyball coach with a winning record.',
          location: 'Miami, FL',
          rating: 4.8,
          imageUrl: '/coach-images/image-female.png',
          availability: 1,
        },
      },
    },
    {
      firstName: 'Anna',
      lastName: 'Wilson',
      email: 'anna.wilson@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Gymnastics',
          description: 'Former Olympian now coaching future stars.',
          location: 'Denver, CO',
          rating: 2.7,
          imageUrl: '/coach-images/image-female.png',
          availability: 2,
        },
      },
    },
    {
      firstName: 'Tom',
      lastName: 'Harris',
      email: 'tom.harris@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Football',
          description: 'Football coach with a focus on defensive strategies.',
          location: 'Dallas, TX',
          rating: 4.6,
          imageUrl: '/coach-images/image-male.png',
          availability: 4,
        },
      },
    },
    {
      firstName: 'Laura',
      lastName: 'Martinez',
      email: 'laura.martinez@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Yoga',
          description:
            'Yoga instructor with a holistic approach to well-being.',
          location: 'Seattle, WA',
          rating: 4.9,
          imageUrl: '/coach-images/image-female.png',
          availability: 5,
        },
      },
    },
    {
      firstName: 'James',
      lastName: 'Carter',
      email: 'james.carter@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Boxing',
          description:
            'Professional boxing coach with a focus on endurance training.',
          location: 'Las Vegas, NV',
          rating: 3.8,
          imageUrl: '/coach-images/image-male.png',
          availability: 5,
        },
      },
    },
    {
      firstName: 'Olivia',
      lastName: 'Thompson',
      email: 'olivia.thompson@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Martial Arts',
          description: 'Martial arts instructor with a black belt in karate.',
          location: 'Phoenix, AZ',
          rating: 4.7,
          imageUrl: '/coach-images/image-female.png',
          availability: 3,
        },
      },
    },
    {
      firstName: 'Henry',
      lastName: 'White',
      email: 'henry.white@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Golf',
          description:
            'Golf coach with expertise in improving swing technique.',
          location: 'Orlando, FL',
          rating: 2.6,
          imageUrl: '/coach-images/image-male.png',
          availability: 0,
        },
      },
    },
    {
      firstName: 'Natalie',
      lastName: 'Green',
      email: 'natalie.green@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'CrossFit',
          description:
            'CrossFit coach with a focus on strength and conditioning.',
          location: 'San Diego, CA',
          rating: 3.8,
          imageUrl: '/coach-images/image-female.png',
          availability: 1,
        },
      },
    },
    {
      firstName: 'Charles',
      lastName: 'King',
      email: 'charles.king@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Cycling',
          description:
            'Cycling coach with experience in long-distance training.',
          location: 'Portland, OR',
          rating: 3.7,
          imageUrl: '/coach-images/image-male.png',
          availability: 2,
        },
      },
    },
    {
      firstName: 'Ethan',
      lastName: 'Taylor',
      email: 'ethan.taylor@example.com',
      role: 'COACH',
      password: await bcrypt.hash('securepassword', 10),
      coachProfile: {
        create: {
          sport: 'Climbing',
          description:
            'Climbing coach with experience in both indoor and outdoor climbs.',
          location: 'Boulder, CO',
          rating: 2.8,
          imageUrl: '/coach-images/image-male.png',
          availability: 4,
        },
      },
    },
  ];

  for (const coach of coachesData) {
    await prisma.user.create({
      data: coach,
    });
  }

  console.log('Users and coach profiles seeded.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding data:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
