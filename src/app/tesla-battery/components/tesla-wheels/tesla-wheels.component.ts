import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const RADIO_CONTROL_ACCESSOR = {
	  multi: true
	, provide: NG_VALUE_ACCESSOR
	, useExisting: forwardRef( () => TeslaWheelsComponent )
};

@Component( {
	  changeDetection: ChangeDetectionStrategy.OnPush
	, providers: [ RADIO_CONTROL_ACCESSOR ]
	, selector: "tesla-wheels"
	, styleUrls: [ "./tesla-wheels.component.scss" ]
	, template: `
		<div class="tesla-wheels">
			<p class="tesla-wheels__title">Wheels</p>
			<div class="tesla-wheels__container cf">
				<label
					class="tesla-wheels__item tesla-wheels__item--{{ size }}"
					[class.tesla-wheels__item--active]="value === size"
					[class.tesla-wheels__item--focused]="focused === size"
					*ngFor="let size of sizes"
				>
					<input
						[attr.value]="size"
						(blur)="onBlur()"
						(change)="onChange( size )"
						[checked]="value === size"
						(focus)="onFocus( size )"
						name="wheelsize"
						type="radio"
					/>
					<p>{{ size }}</p>
				</label>
			</div>
		</div>
	`
} )
export class TeslaWheelsComponent implements ControlValueAccessor {
	private onModelChange: Function;
	private onTouch: Function;
	private value: string;
	private focused: string;
	private sizes = [ 19, 21 ];

	registerOnChange( fn: Function ) {
		this.onModelChange = fn;
	}

	registerOnTouched( fn: Function ) {
		this.onTouch = fn;
	}

	writeValue( value: string ) {
		this.value = value;
	}

	private onChange( value: string ) {
		this.value = value;
		this.onModelChange( value );
	}

	private onBlur() {
		this.focused = "";
	}

	private onFocus( value: string ) {
		this.focused = value;
		this.onTouch();
	}
}
