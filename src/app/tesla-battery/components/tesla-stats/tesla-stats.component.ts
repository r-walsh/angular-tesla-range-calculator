import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Stat } from "../../stats.interface";

@Component( {
	  changeDetection: ChangeDetectionStrategy.OnPush
	, selector: "tesla-stats"
	, styleUrls: [ "./tesla-stats.component.scss" ]
	, template: `
		<div class="tesla-stats">
			<ul>
				<li *ngFor="let stat of stats">
					<div class="tesla-stats-icon tesla-stats-icon--{{ stat.model | lowercase }}"></div>
					<p>{{ stat.miles }}</p>
				</li>
			</ul>
		</div>
	`
} )
export class TeslaStatsComponent {
	@Input() stats: Stat[];
}
