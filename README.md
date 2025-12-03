# AsisPentruCreareSiteWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Raport lucrare de laborator nr. 6

### Partea 1 – Clarificarea conceptelor
- **Componentă:** Bloc autonom care conține HTML, CSS și logică TS. Exemple: `src/app/pages/home/home.ts` și `src/app/pages/list/list.ts` definesc interfețele vizuale reutilizabile ale aplicației.
- **Componentă rădăcină (root):** `App` (`src/app/app.ts`) este bootstrap-uită în `main.ts` și găzduiește layout-ul global (header, footer, `router-outlet`).
- **Standalone:** Toate componentele folosesc `standalone: true`, ceea ce elimină nevoia de module Angular și facilitează importurile directe în rută sau alte componente.
- **Rută (route):** `src/app/app.routes.ts` descrie URL-urile (`'', 'list', 'details/:id', 'about'`) și le leagă de componentele asociate.
- **Model (interface):** `Item` (`src/app/core/models/item.model.ts`) tipizează datele provenite din `assets/data/items.json`, oferind IntelliSense și validare statică.
- **Serviciu (service):** `ItemsService` (`src/app/core/services/items.service.ts`) încarcă datele JSON și le păstrează în memorie (BehaviorSubject) pentru a fi partajate între componente.
- **DI (Dependency Injection):** Serviciile se injectează prin `inject(ItemsService)` sau constructor, permițând reutilizare și testare facilă.
- **Observable / async pipe:** `ItemsService.items$` expune `Observable<Item[]>`. Componentele (`HomePage`, `ListPage`, `DetailsPage`) folosesc `async` pipe în template-uri pentru abonare/dezabonare automată.
- **Formular reactiv:** `AboutPageComponent` utilizează `ReactiveFormsModule`, `FormBuilder` și validatori pentru a crea un formular cu feedback instant.
- **Binding:** Șabloanele folosesc property binding (`[src]`, `[routerLink]`), event binding (`(ngSubmit)`), respectiv two-way binding nu a fost necesar dar se poate adăuga la nevoie.

### Partea 2 – Structură + rutare + layout
- Layout global în `AppComponent` include `HeaderComponent` și `FooterComponent` (Bootstrap) și un container `main` cu `router-outlet`.
- Paginile configurate în `app.routes.ts`: `home`, `list`, `details/:id`, `about`. Navigarea se face via `routerLink` din navbar și din carduri.

### Partea 3 – Date din fișier `.json`
- Fișierul `src/assets/data/items.json` stochează catalogul. `ItemsService.load()` îl citește o singură dată și reține datele în memorie.
- `AppComponent` invocă `itemsService.load()` la bootstrap pentru a evita solicitări duplicate.

### Partea 4 – Listă + card + detalii
- `ListPageComponent` afișează toate elementele din JSON într-o grilă Bootstrap; fiecare card este un `ItemCardComponent` care primește un `Item` prin `@Input`.
- `DetailsPageComponent` recuperează `:id` din rută și afișează informația completă (imagine, descriere, preț, stoc, mărimi).
- `HomePageComponent` afișează articole recomandate și acțiuni rapide către listă sau about.