import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
    
})
export class AppMenuComponent implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {
                items: [
                    {label: 'Users', icon: 'pi pi-fw pi-home', routerLink: ['/user']},
                    {label: 'Daily Statistics', icon: 'pi pi-fw pi-check-square', routerLink: ['/piechart']},
                    {
                        label: "Reports",
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: "Customer Reports",
                                icon: "pi pi-book",
                                routerLink: ["/customer-reports"],
                            },
                            {
                                label: "Vendor Reports",
                                icon: "pi pi-book",
                                routerLink: ["/vendor-reports"],
                            }
                        ]
                    },
                    // {label: 'Reports', icon: 'pi pi-fw pi-check-square', routerLink: ['/piechart']},
                    { label: 'Vendor', icon: 'pi pi-fw pi-user', routerLink: ['/vendor'] },
                    { label: 'Customer', icon: 'pi pi-fw pi-users', routerLink: ['/customer'] },
                    { label: 'Tracking', icon: 'pi pi-fw pi-map-marker', routerLink: ['/tracking'] }


                ]
            },
        ];
    }
}



