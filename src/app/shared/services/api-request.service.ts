import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  private http = inject(HttpClient);
  private publicKey = '50c578956b69e391c07e5d2d7a07caca';
  private privateKey = '98c2dcc17a7c47d586ed0079a909c4ba214a0a9f';

  getAllCharacters(offset: number) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getComicsByCharacter(characterId: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getSeriesByCharacter(characterId: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/characters/${characterId}/series`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getAllComics(offset: number) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/comics?limit=100&offset=${offset}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getAllSeries(offset: number) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/series?limit=100&offset=${offset}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getComic(comicId: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/comics/${comicId}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getSerie(serieId: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/series/${serieId}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }

  getCharacterByName(name: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/characters?name=${name}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }
  getCharacterById(id: string) {
    const timestamp = 1;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const url = new URL(`https://gateway.marvel.com/v1/public/characters/${id}`);
    return this.http.get(url.toString(), {
      params: {
        apikey: this.publicKey,
        ts: timestamp,
        hash: hash,
      },
      headers: {},
    });
  }
}
