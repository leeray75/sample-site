System.register(['angular2/core', './ui-tabs'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ui_tabs_1;
    var DiDemo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ui_tabs_1_1) {
                ui_tabs_1 = ui_tabs_1_1;
            }],
        execute: function() {
            DiDemo = (function () {
                function DiDemo() {
                    this.details = [];
                    this.id = 0;
                }
                DiDemo.prototype.addDetail = function () {
                    this.id++;
                    this.details.push({
                        title: "Detail " + this.id,
                        text: "Some detail text for " + this.id + "..."
                    });
                };
                DiDemo.prototype.removeDetail = function (detail) {
                    this.details = this.details.filter(function (d) { return d !== detail; });
                };
                DiDemo = __decorate([
                    core_1.Component({
                        selector: 'di-demo',
                        templateUrl: MySite.appSrc + '/templates/ng2/dependency-injection/di-demo.html',
                        directives: [ui_tabs_1.UiTabs, ui_tabs_1.UiPane]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DiDemo);
                return DiDemo;
            })();
            exports_1("DiDemo", DiDemo);
        }
    }
});
