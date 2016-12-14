import { Component, Input, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const NUMBER_CONTROL_ACCESSOR = {
	  multi: true
	, provide: NG_VALUE_ACCESSOR
	, useExisting: forwardRef( () => TeslaCounterComponent )
};

@Component( {
	  changeDetection: ChangeDetectionStrategy.OnPush
	, providers: [ NUMBER_CONTROL_ACCESSOR ]
	, selector: "tesla-counter"
	, styleUrls: [ "./tesla-counter.component.scss" ]
	, template: `
		<div class="tesla-counter">
			<p class="tesla-counter__title">{{ title }}</p>
			<div class="tesla-counter__container cf">
				<div
					(blur)="onBlur( $event )"
					class="tesla-counter__item"
					(focus)="onFocus( $event )"
					(keydown)="onKeyDown( $event )"
					tabindex="0"
				>
					<p class="tesla-counter__number">
						{{ value }}
						<span>{{ unit }}</span>
					</p>
					<div class="tesla-counter__controls">
						<button
							(click)="increment()"
							[disabled]="value >= max"
							tabindex="-1"
						>
						</button>
						<button
							(click)="decrement()"
							[disabled]="value <= min"
							tabindex="-1"
						>
						</button>
					</div>
				</div>
			</div>
		</div>
	`
} )
export class TeslaCounterComponent implements ControlValueAccessor {
	@Input() step = 1;
	@Input() min: number;
	@Input() max: number;
	@Input() title = "";
	@Input() unit = "";

	value: number;
	focused: boolean;

	private onTouch: Function;
	private onModelChange: Function;

	private onChange( value: number ) {
		this.value = value;
		this.onModelChange( value );
	}

	registerOnChange( fn: Function ) {
		this.onModelChange = fn;
	}

	registerOnTouched( fn: Function ) {
		this.onTouch = fn;
	}

	writeValue( value: number ) {
		this.value = value;
	}

	increment() {
		if ( this.value < this.max ) {
			this.onChange( this.value + this.step );
		}

		this.onTouch();
	}

	decrement() {
		if ( this.value > this.min ) {
			this.onChange( this.value - this.step );
		}

		this.onTouch();
	}

	private onBlur( event: FocusEvent ) {
		this.focused = false;
		event.preventDefault();
		event.stopPropagation();
	}

	private onKeyDown( event: KeyboardEvent ) {
		const handlers = {
			ArrowDown: () => this.decrement()
			, ArrowUp: () => this.increment()
		};

		if ( handlers[ event.code ] ) {
			handlers[ event.code ]();
			event.preventDefault();
			event.stopPropagation();
		}
	}

	private onFocus( event: FocusEvent ) {
		this.focused = true;
		event.preventDefault();
		event.stopPropagation();
	}
}
