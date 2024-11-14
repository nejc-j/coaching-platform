// src/utils/sportIcons.tsx
import {
  FaBasketballBall,
  FaFootballBall,
  FaBaseballBall,
  FaVolleyballBall,
} from 'react-icons/fa';
import {
  GiTennisRacket,
  GiSoccerBall,
  GiBoxingGlove,
  GiCycling,
  GiMountainClimbing,
} from 'react-icons/gi';
import {
  MdGolfCourse,
  MdOutlineSportsGymnastics,
  MdOutlineSportsMartialArts,
} from 'react-icons/md';
import { IconType } from 'react-icons';
import { FaPersonSwimming } from 'react-icons/fa6';
import { GrYoga } from 'react-icons/gr';
import { IoMdFitness } from 'react-icons/io';

export type SportIconMapping = {
  [key: string]: IconType;
};

export const sportIcons: SportIconMapping = {
  Basketball: FaBasketballBall,
  Football: FaFootballBall,
  Baseball: FaBaseballBall,
  Tennis: GiTennisRacket,
  Soccer: GiSoccerBall,
  Golf: MdGolfCourse,
  Swimming: FaPersonSwimming,
  Volleyball: FaVolleyballBall,
  Gymnastics: MdOutlineSportsGymnastics,
  Yoga: GrYoga,
  Boxing: GiBoxingGlove,
  'Martial Arts': MdOutlineSportsMartialArts,
  Cycling: GiCycling,
  Climbing: GiMountainClimbing,
  Fitness: IoMdFitness,
};
