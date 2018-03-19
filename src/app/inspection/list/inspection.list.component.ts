import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'inspection-list',
  styleUrls: ['inspection.list.component.scss'],
  templateUrl: 'inspection.list.component.html',
})
export class InspectionListComponent implements AfterViewInit {
  public showResult: boolean = true;
  public displayedColumns = [
    'id', 'geography', 'supervisoryAuthority', 'unitSubsidiary', 'dateofCommunication',
    'scope', 'riskType', 'status', 'reportDate', 'inspectionResult', 'actions'
  ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

export interface Element {
  id: string;
  geography: string;
  supervisoryAuthority: string;
  unitSubsidiary: string;
  dateofCommunication: string;
  scope: string;
  riskType: string;
  status: string;
  reportDate: string;
  inspectionResult: string;
}

const ELEMENT_DATA: Element[] = [
  {
    id: 'INS0000001',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BANCO CENTRAL DO BRASIL',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliaçao do Consignado - Parcela em Trânsito(Olé)',
    riskType: 'Compliance and regulatory risk',
    status: 'Upcoming',
    reportDate: '',
    inspectionResult: '1',
  },
  {
    id: 'INS0000002',
    geography: 'BRASIL',
    supervisoryAuthority: 'Eurozone - Banco Central Europeo(BCE)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliação do BCE no Portifólio de Crédito.',
    riskType: 'Risco de Crédito',
    status: 'Closed With Pending Measures',
    reportDate: '25/06/2017',
    inspectionResult: '',
  },
  {
    id: 'INS0000003',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BOVESPA MARKET SUPERVISION (BSM)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '06/03/2017',
    scope: 'Avaliar os processos de Custodiante e Escriturador do Global Inc',
    riskType: 'Compliance and regulatory risk',
    status: 'Closed With Pending Measures	',
    reportDate: '25/06/2017',
    inspectionResult: '2',
  },
  {
    id: 'INS0000004',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BANCO CENTRAL DO BRASIL',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliaçao do Consignado - Parcela em Trânsito(Olé)',
    riskType: 'Compliance and regulatory risk',
    status: 'Upcoming',
    reportDate: '',
    inspectionResult: '',
  },
  {
    id: 'INS0000005',
    geography: 'BRASIL',
    supervisoryAuthority: 'Eurozone - Banco Central Europeo(BCE)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliação do BCE no Portifólio de Crédito.',
    riskType: 'Risco de Crédito',
    status: 'Closed With Pending Measures',
    reportDate: '25/06/2017',
    inspectionResult: '3',
  },
  {
    id: 'INS0000006',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BOVESPA MARKET SUPERVISION (BSM)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '06/03/2017',
    scope: 'Avaliar os processos de Custodiante e Escriturador do Global Inc',
    riskType: 'Compliance and regulatory risk',
    status: 'Closed With Pending Measures	',
    reportDate: '25/06/2017',
    inspectionResult: '3',
  },
  {
    id: 'INS0000007',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BANCO CENTRAL DO BRASIL',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliaçao do Consignado - Parcela em Trânsito(Olé)',
    riskType: 'Compliance and regulatory risk',
    status: 'Upcoming',
    reportDate: '',
    inspectionResult: '1',
  },
  {
    id: 'INS0000008',
    geography: 'BRASIL',
    supervisoryAuthority: 'Eurozone - Banco Central Europeo(BCE)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliação do BCE no Portifólio de Crédito.',
    riskType: 'Risco de Crédito',
    status: 'Closed With Pending Measures',
    reportDate: '25/06/2017',
    inspectionResult: '2',
  },
  {
    id: 'INS0000009',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BOVESPA MARKET SUPERVISION (BSM)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '06/03/2017',
    scope: 'Avaliar os processos de Custodiante e Escriturador do Global Inc',
    riskType: 'Compliance and regulatory risk',
    status: 'Closed With Pending Measures	',
    reportDate: '25/06/2017',
    inspectionResult: '',
  },
  {
    id: 'INS00000010',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BANCO CENTRAL DO BRASIL',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliaçao do Consignado - Parcela em Trânsito(Olé)',
    riskType: 'Compliance and regulatory risk',
    status: 'Upcoming',
    reportDate: '',
    inspectionResult: '3',
  },
  {
    id: 'INS000000011',
    geography: 'BRASIL',
    supervisoryAuthority: 'Eurozone - Banco Central Europeo(BCE)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliação do BCE no Portifólio de Crédito.',
    riskType: 'Risco de Crédito',
    status: 'Closed With Pending Measures',
    reportDate: '25/06/2017',
    inspectionResult: '3',
  },
  {
    id: 'INS00000012',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BOVESPA MARKET SUPERVISION (BSM)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '06/03/2017',
    scope: 'Avaliar os processos de Custodiante e Escriturador do Global Inc',
    riskType: 'Compliance and regulatory risk',
    status: 'Closed With Pending Measures	',
    reportDate: '25/06/2017',
    inspectionResult: '2',
  },
  {
    id: 'INS00000013',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BANCO CENTRAL DO BRASIL',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliaçao do Consignado - Parcela em Trânsito(Olé)',
    riskType: 'Compliance and regulatory risk',
    status: 'Upcoming',
    reportDate: '',
    inspectionResult: '2',
  },
  {
    id: 'INS00000014',
    geography: 'BRASIL',
    supervisoryAuthority: 'Eurozone - Banco Central Europeo(BCE)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '15/09/2016',
    scope: 'Avaliação do BCE no Portifólio de Crédito.',
    riskType: 'Risco de Crédito',
    status: 'Closed With Pending Measures',
    reportDate: '25/06/2017',
    inspectionResult: '',
  },
  {
    id: 'INS00000015',
    geography: 'BRASIL',
    supervisoryAuthority: 'Brasil-BOVESPA MARKET SUPERVISION (BSM)',
    unitSubsidiary: 'Brasil-Banco Brasil S.A.',
    dateofCommunication: '06/03/2017',
    scope: 'Avaliar os processos de Custodiante e Escriturador do Global Inc',
    riskType: 'Compliance and regulatory risk',
    status: 'Closed With Pending Measures	',
    reportDate: '25/06/2017',
    inspectionResult: '1',
  },
];
