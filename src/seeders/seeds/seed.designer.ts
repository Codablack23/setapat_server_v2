import { DesignerRole, Gender } from 'src/lib';

export const superDesignerSeed = {
  firstname: 'Setapat',
  lastname: 'Designer',
  email: 'admin@setapat.com',
  role: DesignerRole.SUPER_DESIGNER,
  gender: Gender.MALE,
  opens_at: '00:00',
  portfolio_link: 'https://setapat.com',
  resume_link: 'https://setapat.com',
  designer_specifications: [],
  closes_at: '23:59',
  working_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
};
