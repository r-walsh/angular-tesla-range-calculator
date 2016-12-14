import { Component, ChangeDetectionStrategy, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const CHECKBOX_VALUE_ACCESSOR = {
	  multi: true
	, provide: NG_VALUE_ACCESSOR
	, useExisting: forwardRef( () => TeslaClimateComponent )
};

@Component( {
	  changeDetection: ChangeDetectionStrategy.OnPush
	, providers: [ CHECKBOX_VALUE_ACCESSOR ]
	, selector: "tesla-climate"
	, styleUrls: [ "./tesla-climate.component.scss" ]
	, template: `
		<div class="tesla-climate">
			<label
				class="tesla-climate__item"
				[class.tesla-climate__item--active]="value"
				[class.tesla-climate__item--focused]="focused === value"
				[class.tesla-heat]="!limit"
			>
				<p>{{ limit ? "ac" : "heat" }} {{ value ? "on" : "off" }}</p>
				<i class="tesla-climate__icon"></i>
				<input
					(blur)="onBlur()"
					(change)="onChange( value )"
					[checked]="value"
					(focus)="onFocus( value )"
					name="climate"
					type="checkbox"
				>
			</label>
		</div>
	`
} )
export class TeslaClimateComponent implements ControlValueAccessor {
	@Input() limit: boolean;

	value = true;
	focused: boolean;

	private onTouch: Function;
	private onModelChange: Function;

	private onChange( value: boolean ) {
		this.value = !value;
		this.onModelChange( this.value );
	}

	registerOnChange( fn: Function ) {
		this.onModelChange = fn;
	}

	registerOnTouched( fn: Function ) {
		this.onTouch = fn;
	}

	writeValue( value: boolean ) {
		this.focused = false;
	}

	private onBlur() {
		this.focused = false;
	}

	private onFocus( value: boolean ) {
		this.focused = value;
		this.onTouch();
	}
}
