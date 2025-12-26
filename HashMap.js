class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.loadFactor = loadFactor;
    this.size = 0;
    this.capacity = initialCapacity;
  }

  _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  _checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    if (typeof key !== 'string') {
        throw new Error('Key must be a string.');
    }

    if ((this.size / this.capacity) >= this.loadFactor) {
      this._resize();
    }

    const index = this._hash(key);
    this._checkIndex(index);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.size++;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  get(key) {
    const index = this._hash(key);
    this._checkIndex(index);

    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          return this.buckets[index][i][1];
        }
      }
    }
    return null;
  }

  has(key) {
    const index = this._hash(key);
    this._checkIndex(index);

    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    const index = this._hash(key);
    this._checkIndex(index);

    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allKeys.push(key);
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allValues.push(value);
        }
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allEntries.push([key, value]);
        }
      }
    }
    return allEntries;
  }
}
