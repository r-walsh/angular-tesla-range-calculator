import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component( {
	  changeDetection: ChangeDetectionStrategy.OnPush
	, selector: "tesla-car"
	, styleUrls: [ "./tesla-car.component.scss" ]
	, template: `
		<div class="tesla-car">
			<div class="tesla-wheels">
				<div class="tesla-wheel tesla-wheel--front tesla-wheel--{{ wheelSize }}"></div>
				<div class="tesla-wheel tesla-wheel--rear tesla-wheel--{{ wheelSize }}"></div>
			</div>
		</div>
	`
} )
export class TeslaCarComponent {
	@Input() wheelSize: number;
}
