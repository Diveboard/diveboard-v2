import { SurveyDanType } from '../../../../../../../../types';

export const DivePlanVariants = ['', 'none', 'table', 'computer', 'another diver'];
export const TableUsedVariants = ['', 'PADI', 'NAUI', 'BSAC', 'Beuhlman', 'US NAVY', 'CSIEMD', 'CSMD', 'COMEX', 'MN90', ' Other', 'none'];
export const RestVariants = ['', 'rested', 'tired', 'exhausted'];
export const ExerciseVariants = ['', 'none', 'light', 'moderate', 'severe', 'exhausting'];
export const PurposeVariants = ['', 'sightseeng', 'learning', 'teaching', 'research', 'photography', 'spearfishing', 'proficiency', 'work', 'other'];
export const ProgramVariants = ['', 'recreational', 'training', 'scientific', 'medical', 'commercial', 'military', 'competitive', 'other'];
export const EnvironmentVariants = ['', 'ocean/sea', 'lake/quarry', 'river/spring', 'cave/cavern', 'pool', 'chamber', 'under ice', 'other'];
export const PlatformVariants = ['', 'beach/shore', 'pier', 'small boat', 'charter boat', 'live-board', 'barge', 'landside', 'hyperbaric facility', 'other'];
export const ThermalVariants = ['', 'comfortable', 'cold', 'very cold', 'hot'];
export const LoadVariants = ['', 'resting', 'light', 'moderate', 'severe', 'exhausting'];
export const DecompressionVariants = ['', 'safety spots', 'in water', 'in chamber', 'other', 'none'];
export const ProblemsVariants = ['', '', 'none', 'equalization', 'vertigo', 'out of air', 'buoyancy', 'shared air', 'rapid ascent', 'sea sickness', 'other'];
export const EquipmentVariants = ['', 'none', 'face mask', 'fins', 'weighting belt', 'BC', 'thermal protection', 'dive computer', 'depth gauge', 'pressure gauge', 'breathing apparatus', 'deco reel', 'other'];

export const BooleanVariants = ['', 'yes', 'no'];
export const ExposeToAltitudeVariants = ['', 'none', 'commercial aircraft', 'unpressurized aircraft', 'medevac aircraft', 'group transportation', 'helicopter'];
export const SexVariants = ['', 'female', 'male', 'other'];
export const LevelVariants = ['', 'student', 'basic', 'advanced/speciality', 'rescue', 'dive master', 'instructor', 'technical/cave/deep diving', 'scientific', 'commercial', 'military'];

export const WeightVariants = ['', 'lb', 'kg'];
export const HeightVariants = ['', 'in', 'cm'];

export const InitialDANFormState: SurveyDanType = {
  version: 1,
  encrypted: false,
  diver: {
    dan_pde_id: null,
    dan_id: null,
    alias: null,
    mother: null,
    sex: null,
    birthday: null,
    email: null,
    language: null,
    citizenship: null,
    first_certif: null,
    certif_level: null,
    dives_12m: null,
    dives_5y: null,
    conditions: null,
    medications: null,
    cigarette: null,
    name: null,
    birthplace: null,
    address: null,
    phone_home: null,
    phone_work: null,
    license: null,
    weight: null,
    height: null,
  },
  dive: {
    dive_plan: null,
    dive_plan_table: null,
    rest: null,
    drinks: null,
    exercice: null,
    med_dive: null,
    purpose: null,
    program: null,
    environment: null,
    platform: null,
    thermal_confort: null,
    workload: null,
    decompression: null,
    problems: null,
    malfunction: null,
    symptoms: null,
    comments: null,
    altitude_exposure: null,
    altitude_interval: null,
    altitude_date: null,
    altitude_length: null,
    altitude_value: null,
    hyperbar: null,
    hyperbar_location: null,
    hyperbar_number: null,
    bottom_gas: null,
    gases_number: 1,
    gases: ['<1><><undefined><><24>'],
    visibility: 0,
    dress: 0,
    apparatus: 0,
    current: 0,
  },
  sent: false,
  previous: null,
};
