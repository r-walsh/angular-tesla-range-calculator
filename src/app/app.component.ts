import { Component } from "@angular/core";

@Component( {
	selector: 'app-root'
	, styleUrls: [ './app.component.scss' ]
	, template: `
		<header class="header">
			<img [src]="logo" />
		</header>
		<div class="wrapper">
			<tesla-battery></tesla-battery>
		</div>
	`
} )
export class AppComponent {
	logo = "assets/logo.svg";
}
