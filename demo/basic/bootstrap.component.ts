import { Component } from '@angular/core';

@Component({
  selector: 'basic-bootstrap-theme-demo',
  template: `
    <div>
      <h3>
        Bootstrap Theme
        <small>
          <a href="https://github.com/sercanuste/ngx-datatable/blob/master/demo/basic/bootstrap.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="bootstrap"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="40"
        [summaryRow]="true"
        [summaryPosition]="'bottom'"
        [footerHeight]="40"
        [limit]="10"
        [rowHeight]="'auto'"
        [reorderable]="reorderable">
      </ngx-datatable>
    </div>
  `
})
export class BootstrapThemeComponent {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: (cells) => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

}
