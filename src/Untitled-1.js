{
  "bpmTemplateVersionId": 12, 
  "lineList": [
      {
          "id": "3", 
          "target": "4", 
          "memo": "线3", 
          "shape": "flow-polyline-round", 
          "label": "a<=10", 
          "lineDirection": 0, 
          "source": "3", 
          "sourceAnchor": 1, 
          "targetAnchor": 0
      }
  ], 
  "nodeList": [
      {
          "message": "结束", 
          "id": "4", 
          "type": "node", 
          "size": "72*72", 
          "color": "#FA8C16", 
          "shape": "flow-circle", 
          "lineLogicExpression": "1&2", 
          "nodetype": 1, 
          "x": 430, 
          "y": 100, 
          "paramCallback": "sasas/asas", 
          "label": "结束"
      }, 
      {
          "message": "发起人上级", 
          "id": "3", 
          "type": "node", 
          "size": "72*72", 
          "color": "#1890FF", 
          "shape": "flow-rect", 
          "lineLogicExpression": "1&2", 
          "nodetype": 3, 
          "ruleFormList": [
              {
                  "ruleConfigId": 1, 
                  "ruleType": 0, 
                  "paramType": 1, 
                  "inputParam": "creatorId"
              }
          ], 
          "x": 290, 
          "y": 100, 
          "paramCallback": "sasas/asas", 
          "label": "发起人上级"
      }
  ], 
  "w": 2000, 
  "h": 2000
}