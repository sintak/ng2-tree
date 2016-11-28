import { Component } from '@angular/core';
import { NodeEvent, TreeModel, RenamableNode } from '../index';

declare const alertify: any;

@Component({
  selector: 'app',
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <div class="chart">
          <div class="title deptTitle" id="deptTitle">
            部门和员工选择 <span id="deptHelp" class="helpTips2">帮助?</span>
          </div>
          <div class="frame frame_hight">
            <div class="input-group">
                <input #keyword type="text" value="" class="form-control" id="keyWord" placeholder="搜索员工姓名" />
                <span class="input-group-addon">
                    <span (click)="searchLogs(keyword.value)" class="glyphicon glyphicon-search"></span>
                </span>
            </div>
            <tree
              [tree]="deptUserList" 
              (nodeRemoved)="onNodeRemoved($event)"
              (nodeRenamed)="onNodeRenamed($event)"
              (nodeSelected)="onNodeSelected($event)"
              (nodeMoved)="onNodeMoved($event)"
              (nodeCreated)="onNodeCreated($event)">
            </tree>
          </div>
        </div>
      </div>
      <div class="tree-container">
        <p>Fonts tree</p>
        <tree
          [tree]="fonts" 
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>
      <div class="tree-container">
        <p>Programming languages tree</p>
        <tree 
          [tree]="pls" 
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>
    </div>
    `,
  styles: [`
   .tree-demo-app {
      margin: auto;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
    }
    .tree-demo-app .tree-container {
      float: left;
      vertical-align: top;
      width: auto;
    }
    .tree-demo-app .tree-container p {
      color: #40a070;
      font-size: 2em;
    } 
    .deptTitle {
      height: 50px !important;
      font: 16px/50px Arial,"微软雅黑" !important;
    }
    .helpTips2 {
      font-size: 14px;
      color: #1accff;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
      float: right;
      margin-right: 15px;
    }
    .chart {
      width: auto;
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      padding-bottom: 20px;
      float: left;
      margin-bottom: 20px;
      min-width: 230px;
    }
    .chart .frame {
      padding: 5px;
      white-space: nowrap;
    /*  font: 12px/24px Arial,"微软雅黑"; */
      color: #666;
    }
    .frame_hight {
      min-height: 328px;
    }
    .tree-container .title {
      height: 66px;
      background: #f6f8fa;
      font: 16px/66px Arial,"微软雅黑";
      color: #666;
      text-indent: 1em;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #e8e8e8;
    }
  `]
})
export class AppComponent {
  public deptUserList: TreeModel = {
    value: 'XX公司',
    children: [
      {
        value: '未分配部门',
        children: [
          {value: 'Bob'}
        ]
      },
      {
        value: '运营部',
        children: [
          {value: 'Jack'},
          {value: 'lili'},
          {value: 'leidi'},
        ]
      },
      {
        value: '研发部',
        children: [
          {
            value: {
              name: 'Java',
              setName(name: string): void {
                this.name = name;
              },
              toString(): string {
                return this.name;
              }
            } as RenamableNode
          },
          {value: 'C++'},
          {value: 'C#'},
          {
            value: 'IONIC',
            children: [
              {value: 'Jack'},
              {value: 'lili'},
              {value: 'leidi'}
            ]
          }
        ]
      }
    ]
  };

  public fonts: TreeModel = {
    value: 'Fonts',
    children: [
      {
        value: 'Serif',
        children: [
          {value: 'Antiqua'},
          {value: 'DejaVu Serif'},
          {value: 'Garamond'},
          {value: 'Georgia'},
          {value: 'Times New Roman'},
          {
            value: 'Slab serif',
            children: [
              {value: 'Candida'},
              {value: 'Swift'},
              {value: 'Guardian Egyptian'}
            ]
          }
        ]
      },
      {
        value: 'Sans-serif',
        children: [
          {value: 'Arial'},
          {value: 'Century Gothic'},
          {value: 'DejaVu Sans'},
          {value: 'Futura'},
          {value: 'Geneva'},
          {value: 'Liberation Sans'}
        ]
      },
      {
        value: 'Monospace',
        children: [
          {value: 'Input Mono'},
          {value: 'Roboto Mono'},
          {value: 'Liberation Mono'},
          {value: 'Hack'},
          {value: 'Consolas'},
          {value: 'Menlo'},
          {value: 'Source Code Pro'}
        ]
      }
    ]
  };

  public pls: TreeModel = {
    value: 'Programming languages by programming paradigm',
    children: [
      {
        value: 'Aspect-oriented programming',
        children: [
          {value: 'AspectJ'},
          {value: 'AspectC++'}
        ]
      },
      {
        value: 'Object-oriented programming',
        children: [
          {
            value: {
              name: 'Java',
              setName(name: string): void {
                this.name = name;
              },
              toString(): string {
                return this.name;
              }
            } as RenamableNode
          },
          {value: 'C++'},
          {value: 'C#'}
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'TypeScript'}
        ]
      }
    ]
  };

  public onNodeRemoved(e: NodeEvent): void {
    this.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    this.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    this.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    this.logEvent(e, 'Created');
  }

  public onNodeSelected(e: NodeEvent): void {
    this.logEvent(e, 'Selected');
  }

  public logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}
