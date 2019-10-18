import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  Input
} from "@angular/core";

@Directive({
  selector: "[appTooltip]"
})
export class TooltipDirective implements OnInit, AfterViewInit {
  @Input("tooltipText") tooltipText: string;

  toolTipWrapperElement: HTMLElement;
  thisWidth: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.thisWidth = (this.el.nativeElement as HTMLElement).clientWidth;
    this.tooltipText = this.tooltipText
      ? this.tooltipText
      : this.el.nativeElement.innerText;

    console.log(this.el.nativeElement.getBoundingClientRect());
  }

  ngAfterViewInit() {
    this.toolTipWrapperElement = this.renderer.createElement("span");
    this.renderer.setStyle(this.toolTipWrapperElement, "position", "absolute");
    this.renderer.setStyle(this.toolTipWrapperElement, "top", "100%");
    this.renderer.setStyle(this.toolTipWrapperElement, "z-index", "999");
    this.renderer.setStyle(this.toolTipWrapperElement, "width", "auto");
    this.renderer.setStyle(this.toolTipWrapperElement, "min-width", "130px");
    this.renderer.setStyle(this.toolTipWrapperElement, "padding", "4px 8px");
    this.renderer.setStyle(this.toolTipWrapperElement, "text-align", "center");
    this.renderer.setStyle(
      this.toolTipWrapperElement,
      "background-color",
      "#000000"
    );
    this.renderer.setStyle(this.toolTipWrapperElement, "color", "#ffffff");
    this.renderer.setStyle(this.toolTipWrapperElement, "border-radius", "4px");
    this.renderer.setStyle(this.toolTipWrapperElement, "font-size", "12px");

    this.renderer.setStyle(this.el.nativeElement, "position", "relative");

    this.toolTipWrapperElement.innerText = this.tooltipText;

    if (this.thisWidth <= this.toolTipWrapperElement.clientWidth) {
      this.renderer.setStyle(this.toolTipWrapperElement, "left", "0px");
    } else {
      const s = (this.thisWidth - this.toolTipWrapperElement.clientWidth) / 2;
      this.renderer.setStyle(this.toolTipWrapperElement, "right", s + "px");
    }

    this.renderer.listen(this.el.nativeElement, "mouseenter", () => {
      this.renderer.appendChild(
        this.el.nativeElement,
        this.toolTipWrapperElement
      );
    });

    this.renderer.listen(this.el.nativeElement, "mouseleave", () => {
      // this.renderer.removeChild(
      //   this.el.nativeElement,
      //   this.toolTipWrapperElement
      // );
    });
  }
}
