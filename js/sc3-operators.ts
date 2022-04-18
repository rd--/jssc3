// sc3-operators.ts

var unaryOperators : { [key: string]: number } = {
  neg: 0,
  not: 1,
  isNil: 2,
  notNil: 3,
  bitNot: 4,
  abs: 5,
  asFloat: 6,
  asInt: 7,
  ceil: 8,
  floor: 9,
  frac: 10,
  sign: 11,
  squared: 12,
  cubed: 13,
  sqrt: 14,
  exp: 15,
  recip: 16,
  midiCps: 17,
  cpsMidi: 18,
  midiRatio: 19,
  ratioMidi: 20,
  dbAmp: 21,
  ampDb: 22,
  octCps: 23,
  cpsOct: 24,
  log: 25,
  log2: 26,
  log10: 27,
  sin: 28,
  cos: 29,
  tan: 30,
  arcSin: 31,
  arcCos: 32,
  arcTan: 33,
  sinH: 34,
  cosH: 35,
  tanH: 36,
  rand_: 37,
  rand2: 38,
  linRand_: 39,
  biLinRand: 40,
  sum3Rand: 41,
  distort: 42,
  softClip: 43,
  coin: 44,
  digitValue: 45,
  silence: 46,
  thru: 47,
  rectWindow: 48,
  hanWindow: 49,
  welchWindow: 50,
  triWindow: 51,
  ramp_: 52,
  scurve: 53,
};

function unaryOperatorName(specialIndex: number): string {
    return Object.keys(unaryOperators).find(key => unaryOperators[key] === specialIndex) || 'unknown unary operator name?';
}

var binaryOperators : { [key: string]: number } = {
  add: 0,
  sub: 1,
  mul: 2,
  idiv: 3,
  fdiv: 4,
  mod: 5,
  eq: 6,
  ne: 7,
  lt: 8,
  gt: 9,
  le: 10,
  ge: 11,
  min: 12,
  max: 13,
  bitAnd: 14,
  bitOr: 15,
  bitXor: 16,
  lcm: 17,
  gcd: 18,
  round: 19,
  roundUp: 20,
  trunc: 21,
  atan2: 22,
  hypot: 23,
  hypotx: 24,
  pow: 25,
  shiftLeft: 26,
  shiftRight: 27,
  unsignedShift: 28,
  fill: 29,
  ring1: 30,
  ring2: 31,
  ring3: 32,
  ring4: 33,
  difSqr: 34,
  sumSqr: 35,
  sqrSum: 36,
  sqrDif: 37,
  absDif: 38,
  thresh: 39,
  amClip: 40,
  scaleNeg: 41,
  clip2: 42,
  excess: 43,
  fold2: 44,
  wrap2: 45,
  firstArg: 46,
  randRange: 47,
  expRandRange: 48,
};

function binaryOperatorName(specialIndex: number): string {
    return Object.keys(binaryOperators).find(key => binaryOperators[key] === specialIndex) || 'unknown binary operator name?';
}

