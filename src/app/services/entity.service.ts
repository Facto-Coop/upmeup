import { Injectable } from '@angular/core';
import { Entity } from '../models/entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  public getEntities() {
    let entity: Entity[];

    entity = [{"id": 1, "entityName": "Axx TV", "sector": "Comunicación", "city": "Lyon", "valores": ["Libertad", "Paciencia", "Respeto"]},
    {"id": 2, "entityName": "McDermott Group", "sector": "Technology", "city": "Menorca", "valores": ["Energía", "Social"]},
    {"id": 3, "entityName": "O'Reilly school", "sector": "Education", "city": "Liverpool", "valores": ["Superación", "Cooperación", "Disciplina", "Respeto"]},
    {"id": 4, "entityName": "Niko Lawyer", "sector": "Financial Services", "city": "Amsterdam", "valores": ["Justicia", "Responsabilidad", "Confianza"] },
    {"id": 5, "entityName": "Hamill Hospital", "sector": "Health Services", "city": "Valencia", "valores": ["Optimismo", "Honestidad", "Honor", "Tolerancia"]},
    {"id": 6, "entityName": "Beer Inc", "sector": "Food and Drink", "city": "Sevilla", "valores": ["Excelencia", "Servicio", "Paciencia"]},
    {"id": 7, "entityName": "Feest Tech.", "sector": "Technology", "city": "Barcelona", "valores": ["Puntualidad", "Compromiso"]},
    {"id": 8, "entityName": "City Hall", "sector": "Public Services", "city": "London", "valores": ["Igualdad", "Medio Ambiente", "Empatia"]},
    {"id": 9, "entityName": "Rotes Rathaus", "sector": "Public Services", "city": "Berlin", "valores": ["Transparencia", "Impacto Social", "Igualdad"]},
    {"id": 10, "entityName": "Reproduction Center", "sector": "Health Services", "city": "Paris", "valores": ["Honestidad", "Paciencia", "Empatia"]},
    {"id": 11, "entityName": "Murazik Inc", "sector": "Textil Services", "city": "Oslö", "valores": ["Superación", "Medio Ambiente", "Excelencia"]},
    {"id": 12, "entityName": "Gutmann Group", "sector": "Construction", "city": "Praga", "valores": ["Compromiso", "Respeto", "Igualdad", "Tolerancia"]},
    {"id": 13, "entityName": "Wiener Rathaus", "sector": "Public Services", "city": "Viena", "valores": ["Igualdad", "Compromiso", "Humildad"]},
    {"id": 14, "entityName": "Wäscherei AG", "sector": "Textilpflege", "city": "Zurich", "valores": ["Impacto Social", "Superación", "Igualdad"]},
    {"id": 15, "entityName": "Schowalter LLC", "sector": "Transport", "city": "Salzburg", "valores": ["Puntualidad", "Medio Ambiente", "Servicio"]},
    {"id": 16, "entityName": "Atos", "sector": "Technology", "city": "Warsaw", "valores": ["Esfuerzo", "Humildad"]},
    {"id": 17, "entityName": "Elmü", "sector": "Utilities", "city": "Budapest", "valores": ["Cooperación", "Lealtad"]},
    {"id": 18, "entityName": "Zagreb Construction", "sector": "Construction", "city": "Zagreb", "valores": ["Transparencia", "Impacto Social"]},
    {"id": 19, "entityName": "Psykisk Hälsa", "sector": "Health Services", "city": "Malmö", "valores": ["Libertad", "Cooperación", "Superación", "Empatia"]},
    {"id": 20, "entityName": "Central Bank", "sector": "Financial Services", "city": "Cork", "valores": ["Excelencia", "Disciplina", "Respeto"]}
  ];

    return entity;
  }

}
