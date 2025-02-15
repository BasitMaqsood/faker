import Gen from './vendor/mersenne';

/**
 * Module to generate seed based random numbers.
 */
export class Mersenne {
  private gen = new Gen();

  constructor() {
    this.gen.init_genrand(new Date().getTime() % 1000000000);

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Mersenne.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random number between [min, max)'.
   *
   * @param max The maximum number. Defaults to `0`.
   * @param min The minimum number. Defaults to `32768`. Required if `max` is set.
   *
   * @example
   * faker.mersenne.rand() // 15515
   * faker.mersenne.rand(500, 1000) // 578
   */
  rand(max?: number, min?: number): number {
    // TODO @Shinigami92 2022-01-11: This is buggy, cause if min is not passed but only max,
    // then min will be undefined and this result in NaN for the whole function
    if (max === undefined) {
      min = 0;
      max = 32768;
    }

    return Math.floor(this.gen.genrand_real2() * (max - min) + min);
  }

  /**
   * Sets the seed to use.
   *
   * @param S The seed to use.
   * @throws If the seed is not a `number`.
   */
  seed(S: number): void {
    if (typeof S != 'number') {
      throw new Error('seed(S) must take numeric argument; is ' + typeof S);
    }

    this.gen.init_genrand(S);
  }

  /**
   * Sets the seed to use.
   *
   * @param A The seed to use.
   * @throws If the seed is not a `number[]`.
   */
  seed_array(A: number[]): void {
    if (typeof A != 'object') {
      throw new Error(
        'seed_array(A) must take array of numbers; is ' + typeof A
      );
    }

    this.gen.init_by_array(A, A.length);
  }
}
