export class OsnTableConfig {
  sortable: boolean = false;
  actions: OsnActionsButtons[] = [];
}

export class OsnActionsButtons {
  action: string;
  icon: string;
  status: string;
  toolTipStatus: string;
  toolTipText: string;
  toolTipIcon: string;
}
