import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { BatteryService } from "./tesla-battery.service";

import { TeslaBatteryComponent } from "./containers/tesla-battery/tesla-battery.component";

import { TeslaCarComponent } from "./components/tesla-car/tesla-car.component";
import { TeslaClimateComponent } from "./components/tesla-climate/tesla-climate.component";
import { TeslaCounterComponent } from "./components/tesla-counter/tesla-counter.component";
import { TeslaStatsComponent } from "./components/tesla-stats/tesla-stats.component";
import { TeslaWheelsComponent } from "./components/tesla-wheels/tesla-wheels.component";

@NgModule( {
	declarations: [
		  TeslaBatteryComponent
		, TeslaCarComponent
		, TeslaClimateComponent
		, TeslaCounterComponent
		, TeslaStatsComponent
		, TeslaWheelsComponent
	]
	, exports: [ TeslaBatteryComponent ]
	, imports: [
		  CommonModule
		, ReactiveFormsModule
	]
	, providers: [ BatteryService ]
} )
export class TeslaBatteryModule {
}
