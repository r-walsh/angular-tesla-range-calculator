import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Stat } from "../../stats.interface";
import { TeslaConfig } from "../../tesla-config.interface";

import { BatteryService } from "../../tesla-battery.service";

@Component( {
	  selector: "tesla-battery"
	, styleUrls: [ "./tesla-battery.component.scss" ]
	, template: `
		<form class="tesla-battery" [formGroup]="tesla">
			<h1>{{ title }}</h1>
			<tesla-car [wheelSize]="tesla.get( 'config.wheels' ).value"></tesla-car>
			<tesla-stats [stats]="stats"></tesla-stats>
			<div class="tesla-controls cf" formGroupName="config">
				<tesla-counter
					formControlName="speed"
					[max]="70"
					[min]="45"
					[step]="5"
					[title]="'Speed'"
					[unit]="'mph'"
				>
				</tesla-counter>
				<div class="tesla-climate cf">
					<tesla-counter
						formControlName="temperature"
						[max]="40"
						[min]="-10"
						[step]="10"
						[title]="'Outside Temperature'"
						[unit]="'°'"
					>
					</tesla-counter>
					<tesla-climate
						formControlName="climate"
						[limit]="tesla.get( 'config.temperature' ).value > 10"
					>
					</tesla-climate>
				</div>
				<tesla-wheels formControlName="wheels"></tesla-wheels>
			</div>
			<div class="tesla-battery__notice">
				<p>
					The actual amount of range that you experience will vary based 
					on your particular use conditions. See how particular use conditions 
					may affect your range in our simulation model.
				</p>
				<p>
					Vehicle range may vary depending on the vehicle configuration, 
					battery age and condition, driving style and operating, environmental 
					and climate conditions.
				</p>
			</div>
		</form>
	`
} )
export class TeslaBatteryComponent implements OnInit {
	models: any;
	stats: Stat[];
	tesla: FormGroup;
	title = "Range Per Charge";

	private results = [ "60", "60D", "75", "75D", "90D", "P100D" ];

	constructor( public fb: FormBuilder, private batteryService: BatteryService ) {
	}

	ngOnInit() {
		this.models = this.batteryService.getModelData();

		this.tesla = this.fb.group( {
			config: this.fb.group( {
				  climate: true
				, speed: 55
				, temperature: 20
				, wheels: 19
			} )
		} );

		this.setStats( this.results, this.tesla.controls[ "config" ].value );
		this.tesla.controls[ "config" ]
			.valueChanges
			.subscribe( ( data: TeslaConfig ) => this.setStats( this.results, data ) );
	}

	private setStats( models: string[], value: TeslaConfig ) {
		this.stats = this.calculateStats( models, value );
	}

	private calculateStats( models: string[], value: TeslaConfig ): Stat[] {
		return models.map( model => {
			const { climate, speed, temperature, wheels } = value;
			const miles = this.models[ model ][ wheels ][ climate ? "on" : "off" ].speed[ speed ][ temperature ];

			return {
				miles
				, model
			}
		} );
	}
}
