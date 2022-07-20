import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Hero } from './hero';
import { environment } from '../../environments/environment';

type HeroesApiGetResponse = {
  _embedded: {
    heroList: Array<Hero>;
  };
};

@Injectable({
  providedIn: 'root',
})
export class HeroesRepositoryService {
  private readonly heroesApiEndpoint = environment.heroesApiUrl; //* Endereço url da API

  constructor(private readonly httpClient: HttpClient) {} //* Responsavel pela responsividade HTTP client, após isso deve-se adicionar ao app.module[ HttpClientModule ]

  public all(): Observable<Array<Hero>> { //* Pegar todos os Heroes
    return this.httpClient
      .get<HeroesApiGetResponse>(this.heroesApiEndpoint)
      .pipe(map((response) => response._embedded.heroList));
  }

  public newHero(newHero: Hero): Observable<Hero> { //* Inserir novo hero
    return this.httpClient.post<Hero>(this.heroesApiEndpoint, newHero);
  }

  public one(heroId: number): Observable<Hero> { //* Pegar apenas um hero
    const heroesApiEndpointWithHeroId = `${this.heroesApiEndpoint}${heroId}`;
    return this.httpClient.get<Hero>(heroesApiEndpointWithHeroId);
  }

  public replaceHero(newHero: Hero, currentHeroId: number): Observable<Hero> { //* Alterar hero
    const heroesApiEndpointWithHeroId = `${this.heroesApiEndpoint}${currentHeroId}`;
    return this.httpClient.put<Hero>(heroesApiEndpointWithHeroId, newHero);
  }

  public deleteHero(heroId: number): Observable<void> { //* Deletar hero
    const heroesApiEndpointWithHeroId = `${this.heroesApiEndpoint}${heroId}`;
    return this.httpClient.delete<void>(heroesApiEndpointWithHeroId);
  }
}
