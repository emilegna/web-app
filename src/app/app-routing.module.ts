import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { ListadoAlumnosComponent } from './alumnos/listado-alumnos/listado-alumnos.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { ListadoClasesComponent } from './clases/listado-clases/listado-clases.component';
import { ListadoClasesAlumnoComponent } from './clases/listado-clases-alumno/listado-clases-alumno.component';
import { ListadoActividadesComponent } from './actividades/listado-actividades/listado-actividades.component';
import { AgregarActividadComponent } from './actividades/agregar-actividad/agregar-actividad.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './_guards/CanActivateAuth';
import { CanActivateLoginGuard } from './_guards/CanActivateLogin';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CanActivateClassGuard } from './_guards/CanActivateClass';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginGuard],
  },
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'alumnos',
        component: ListadoAlumnosComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_USUARIOS']}
      },
      {
        path: 'alumnos/agregar',
        component: AgregarAlumnoComponent
      },
      {
        path: 'clases',
        component: ListadoClasesComponent,
        canActivate: [CanActivateClassGuard],
      },
      {
        path: 'clases/alumno',
        component: ListadoClasesAlumnoComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_LISTADO_CLASES_ESPECIFICAS_ALUMNO']}
      },
      {
        path: 'actividades',
        component: ListadoActividadesComponent
      },
      {
        path: 'actividades/agregar',
        component: AgregarActividadComponent
      },
      {
        path: 'actividades/editar/:idActividad',
        component: AgregarActividadComponent
      }
    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateAuthGuard, CanActivateLoginGuard, CanActivateClassGuard]
})
export class AppRoutingModule {}
