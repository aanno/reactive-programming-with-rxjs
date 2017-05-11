SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "reactive-programming-with-rxjs-jspm/": "src/"
  },
  browserConfig: {
    "baseURL": ".",
    "bundles": {
      "build.js": [
        "reactive-programming-with-rxjs-jspm/app.ts",
        "reactive-programming-with-rxjs-jspm/spaceship/spaceship.ts",
        "npm:rx@4.1.0/index.js",
        "npm:rx@4.1.0.json",
        "npm:jspm-nodelibs-process@0.2.1/process.js",
        "npm:jspm-nodelibs-process@0.2.1.json",
        "npm:rx@4.1.0/dist/rx.time.js",
        "npm:rx@4.1.0/dist/rx.js",
        "npm:rx@4.1.0/dist/rx.testing.js",
        "npm:rx@4.1.0/dist/rx.virtualtime.js",
        "npm:rx@4.1.0/dist/rx.sorting.js",
        "npm:rx@4.1.0/dist/rx.joinpatterns.js",
        "npm:rx@4.1.0/dist/rx.experimental.js",
        "npm:rx@4.1.0/dist/rx.coincidence.js",
        "npm:rx@4.1.0/dist/rx.binding.js",
        "npm:rx@4.1.0/dist/rx.backpressure.js",
        "npm:rx@4.1.0/dist/rx.async.js",
        "npm:rx@4.1.0/dist/rx.aggregates.js",
        "npm:loglevel@1.4.1/lib/loglevel.js",
        "npm:loglevel@1.4.1.json",
        "npm:tslib@1.7.0/tslib.js",
        "npm:tslib@1.7.0.json"
      ]
    }
  },
  devConfig: {
    "map": {
      "plugin-typescript": "github:frankwallis/plugin-typescript@7.0.6",
      "typescript": "npm:typescript@2.3.2",
      "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
      "assert": "npm:jspm-nodelibs-assert@0.2.1",
      "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
      "module": "npm:jspm-nodelibs-module@0.2.1",
      "fs": "npm:jspm-nodelibs-fs@0.2.1",
      "path": "npm:jspm-nodelibs-path@0.2.3",
      "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
      "util": "npm:jspm-nodelibs-util@0.2.2",
      "os": "npm:jspm-nodelibs-os@0.2.1",
      "stream": "npm:jspm-nodelibs-stream@0.2.1",
      "constants": "npm:jspm-nodelibs-constants@0.2.1",
      "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
      "vm": "npm:jspm-nodelibs-vm@0.2.1",
      "events": "npm:jspm-nodelibs-events@0.2.2",
      "net": "npm:jspm-nodelibs-net@0.2.1",
      "systemjs-hot-reloader": "npm:systemjs-hot-reloader@1.1.0"
    },
    "packages": {
      "npm:typescript@2.3.2": {
        "map": {
          "source-map-support": "npm:source-map-support@0.4.15"
        }
      },
      "npm:source-map-support@0.4.15": {
        "map": {
          "source-map": "npm:source-map@0.5.6"
        }
      },
      "npm:jspm-nodelibs-buffer@0.2.3": {
        "map": {
          "buffer": "npm:buffer@5.0.6"
        }
      },
      "npm:buffer@5.0.6": {
        "map": {
          "base64-js": "npm:base64-js@1.2.0",
          "ieee754": "npm:ieee754@1.1.8"
        }
      },
      "npm:jspm-nodelibs-crypto@0.2.1": {
        "map": {
          "crypto-browserify": "npm:crypto-browserify@3.11.0"
        }
      },
      "npm:jspm-nodelibs-os@0.2.1": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      },
      "npm:crypto-browserify@3.11.0": {
        "map": {
          "browserify-sign": "npm:browserify-sign@4.0.4",
          "public-encrypt": "npm:public-encrypt@4.0.0",
          "create-hash": "npm:create-hash@1.1.2",
          "randombytes": "npm:randombytes@2.0.3",
          "diffie-hellman": "npm:diffie-hellman@5.0.2",
          "browserify-cipher": "npm:browserify-cipher@1.0.0",
          "create-hmac": "npm:create-hmac@1.1.4",
          "create-ecdh": "npm:create-ecdh@4.0.0",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:browserify-sign@4.0.4": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "create-hmac": "npm:create-hmac@1.1.4",
          "inherits": "npm:inherits@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "parse-asn1": "npm:parse-asn1@5.1.0",
          "browserify-rsa": "npm:browserify-rsa@4.0.1",
          "elliptic": "npm:elliptic@6.4.0"
        }
      },
      "npm:public-encrypt@4.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "randombytes": "npm:randombytes@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "parse-asn1": "npm:parse-asn1@5.1.0",
          "browserify-rsa": "npm:browserify-rsa@4.0.1"
        }
      },
      "npm:diffie-hellman@5.0.2": {
        "map": {
          "randombytes": "npm:randombytes@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "miller-rabin": "npm:miller-rabin@4.0.0"
        }
      },
      "npm:create-hmac@1.1.4": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:pbkdf2@3.0.9": {
        "map": {
          "create-hmac": "npm:create-hmac@1.1.4"
        }
      },
      "npm:create-hash@1.1.2": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "cipher-base": "npm:cipher-base@1.0.3",
          "sha.js": "npm:sha.js@2.4.8",
          "ripemd160": "npm:ripemd160@1.0.1"
        }
      },
      "npm:create-ecdh@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "elliptic": "npm:elliptic@6.4.0"
        }
      },
      "npm:parse-asn1@5.1.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "asn1.js": "npm:asn1.js@4.9.1"
        }
      },
      "npm:browserify-rsa@4.0.1": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "randombytes": "npm:randombytes@2.0.3"
        }
      },
      "npm:elliptic@6.4.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "inherits": "npm:inherits@2.0.3",
          "hash.js": "npm:hash.js@1.0.3",
          "brorand": "npm:brorand@1.1.0",
          "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
          "hmac-drbg": "npm:hmac-drbg@1.0.1"
        }
      },
      "npm:cipher-base@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:browserify-cipher@1.0.0": {
        "map": {
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "browserify-des": "npm:browserify-des@1.0.0",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
        }
      },
      "npm:browserify-aes@1.0.6": {
        "map": {
          "cipher-base": "npm:cipher-base@1.0.3",
          "create-hash": "npm:create-hash@1.1.2",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "inherits": "npm:inherits@2.0.3",
          "buffer-xor": "npm:buffer-xor@1.0.3"
        }
      },
      "npm:browserify-des@1.0.0": {
        "map": {
          "cipher-base": "npm:cipher-base@1.0.3",
          "inherits": "npm:inherits@2.0.3",
          "des.js": "npm:des.js@1.0.0"
        }
      },
      "npm:sha.js@2.4.8": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:evp_bytestokey@1.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2"
        }
      },
      "npm:miller-rabin@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "brorand": "npm:brorand@1.1.0"
        }
      },
      "npm:asn1.js@4.9.1": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:hash.js@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:hmac-drbg@1.0.1": {
        "map": {
          "hash.js": "npm:hash.js@1.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
          "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
        }
      },
      "npm:des.js@1.0.0": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:jspm-nodelibs-stream@0.2.1": {
        "map": {
          "stream-browserify": "npm:stream-browserify@2.0.1"
        }
      },
      "npm:stream-browserify@2.0.1": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "readable-stream": "npm:readable-stream@2.2.9"
        }
      },
      "npm:jspm-nodelibs-string_decoder@0.2.1": {
        "map": {
          "string_decoder": "npm:string_decoder@0.10.31"
        }
      },
      "npm:readable-stream@2.2.9": {
        "map": {
          "string_decoder": "npm:string_decoder@1.0.0",
          "inherits": "npm:inherits@2.0.3",
          "buffer-shims": "npm:buffer-shims@1.0.0",
          "util-deprecate": "npm:util-deprecate@1.0.2",
          "process-nextick-args": "npm:process-nextick-args@1.0.7",
          "core-util-is": "npm:core-util-is@1.0.2",
          "isarray": "npm:isarray@1.0.0"
        }
      },
      "npm:string_decoder@1.0.0": {
        "map": {
          "buffer-shims": "npm:buffer-shims@1.0.0"
        }
      },
      "npm:systemjs-hot-reloader@1.1.0": {
        "map": {
          "systemjs-hmr": "npm:systemjs-hmr@2.0.9"
        }
      }
    }
  },
  transpiler: "plugin-typescript",
  typescriptOptions: {
    "tsconfig": true,
    "sourceMap": true
  },
  packages: {
    "reactive-programming-with-rxjs-jspm": {
      "main": "app.js",
      "meta": {
        "*.js": {
          "loader": "plugin-typescript"
        },
        "*.jsx": {
          "loader": "plugin-typescript"
        },
        "*.ts": {
          "loader": "plugin-typescript"
        },
        "*.tsx": {
          "loader": "plugin-typescript"
        }
      }
    }
  },
  map: {
    "@hot": "@empty"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "@types/qunit": "npm:@types/qunit@1.16.31",
    "@types/rx-dom": "npm:@types/rx-dom@7.0.0",
    "leaflet": "github:Leaflet/Leaflet@0.7.3",
    "qunit": "github:qunitjs/qunit@1.11.0",
    "rx-dom": "npm:rx-dom@7.0.3",
    "@types/loglevel": "npm:@types/loglevel@1.4.29",
    "loglevel": "npm:loglevel@1.4.1",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "rx": "npm:rx@4.1.0",
    "tslib": "npm:tslib@1.7.0"
  },
  packages: {
    "npm:@types/rx-dom@7.0.0": {
      "map": {
        "@types/rx": "npm:@types/rx@4.1.1"
      }
    },
    "npm:@types/rx@4.1.1": {
      "map": {
        "@types/rx-lite-coincidence": "npm:@types/rx-lite-coincidence@4.0.2",
        "@types/rx-core-binding": "npm:@types/rx-core-binding@4.0.3",
        "@types/rx-lite-time": "npm:@types/rx-lite-time@4.0.2",
        "@types/rx-lite-async": "npm:@types/rx-lite-async@4.0.1",
        "@types/rx-lite-experimental": "npm:@types/rx-lite-experimental@4.0.1",
        "@types/rx-lite-testing": "npm:@types/rx-lite-testing@4.0.1",
        "@types/rx-lite-backpressure": "npm:@types/rx-lite-backpressure@4.0.2",
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4",
        "@types/rx-lite-aggregates": "npm:@types/rx-lite-aggregates@4.0.2",
        "@types/rx-lite-virtualtime": "npm:@types/rx-lite-virtualtime@4.0.2",
        "@types/rx-lite-joinpatterns": "npm:@types/rx-lite-joinpatterns@4.0.1",
        "@types/rx-core": "npm:@types/rx-core@4.0.3"
      }
    },
    "npm:@types/rx-lite-coincidence@4.0.2": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-time@4.0.2": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-async@4.0.1": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-experimental@4.0.1": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-backpressure@4.0.2": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite@4.0.4": {
      "map": {
        "@types/rx-core-binding": "npm:@types/rx-core-binding@4.0.3",
        "@types/rx-core": "npm:@types/rx-core@4.0.3"
      }
    },
    "npm:@types/rx-lite-testing@4.0.1": {
      "map": {
        "@types/rx-lite-virtualtime": "npm:@types/rx-lite-virtualtime@4.0.2"
      }
    },
    "npm:@types/rx-core-binding@4.0.3": {
      "map": {
        "@types/rx-core": "npm:@types/rx-core@4.0.3"
      }
    },
    "npm:@types/rx-lite-aggregates@4.0.2": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-virtualtime@4.0.2": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:@types/rx-lite-joinpatterns@4.0.1": {
      "map": {
        "@types/rx-lite": "npm:@types/rx-lite@4.0.4"
      }
    },
    "npm:rx-dom@7.0.3": {
      "map": {
        "rx": "npm:rx@4.1.0"
      }
    }
  }
});
