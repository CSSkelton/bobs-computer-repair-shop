/**
 * Title: security.component.ts
 * Author: Professor Krasso
 * Editor: Cody Skelton
 * Date: 07.02.2024
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  // router outlet for the security module
  template: `
    <!-- the code here as been added to test the security module -->
    <!-- once you start building the security module, you can remove this code, but leave the router-outlet -->
    <div class='container-fluid'>
      <div class='col'>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class SecurityComponent {

}
