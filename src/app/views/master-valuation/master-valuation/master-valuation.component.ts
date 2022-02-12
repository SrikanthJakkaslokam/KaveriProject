import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-valuation',
  templateUrl: './master-valuation.component.html',
  styleUrls: ['./master-valuation.component.scss']
})
export class MasterValuationComponent implements OnInit {

  constructor() { }
  deletePopup = false
  newRecordPopup = false;
  isEdit = false;
  isParentEdit=false;

  tableData = [
    {
      name: 'Afzalpur',
      rname: 'ಅಫಜಲಪುರ',
      region: 'Gram Panchayat/ Other',
      isActive: false,
      children: [
        {
          name: 'Dry, No Source of Irrigation, Black Soil',
          rate: '3,95,000.00',
          unit: 'Acres'
        },
        {
          name: 'Dry, No Source of Irrigation, Red Soil',
          rate: '3,17,000.00',
          unit: 'Acres'
        },
        {
          name: 'Dry, Agricultural Land, Irrigation by Bore/ Well',
          rate: '5,93,000.00',
          unit: 'Acres'
        },
        {
          name: 'Dry, No Source of Irrigation, Maradi',
          rate: '2,77,000.00',
          unit: 'Acres'
        },
        {
          name: 'Non Agricultural Land',
          rate: '0.00',
          unit: 'Acres'
        }
      ]
    },
    {
      name: 'Afzalpur (Lands Bheema and Amarja Rivers Bank',
      rname: 'ಅಫಜಲ್‌ಪುರ (ಭೀಮಾ ಮತ್ತು ಅಮರ್ಜಾ ನದಿ ದಂಡೆ',
      region: 'Gram Panchayat/ Other',
      isActive: false,
      children: [
        {
          name: 'Dry, No Source of Irrigation, Black Soil',
          rate: '3,95,000.00',
          unit: 'Acres'
        },
        {
          name: 'Dry, No Source of Irrigation, Red Soil',
          rate: '3,17,000.00',
          unit: 'Acres'
        },
      ]
    },
    {
      name: 'Afzalpur State Highway Sy. No.',
      rname: 'ಅಫಜಲಪುರ ರಾಜ್ಯ ಹೆದ್ದಾರಿ ಸೈ. ಸಂ.',
      region: 'Gram Panchayat/ Other',
      isActive: false,
      children: [
        {
          name: 'Dry, No Source of Irrigation, Black Soil',
          rate: '3,95,000.00',
          unit: 'Acres'
        },
      ]
    },
    {
      name: 'Afzalpur District Road Sy. No.',
      rname: 'ಅಫಜಲಪುರ ಜಿಲ್ಲಾ ರಸ್ತೆ ಸೈ. ಸಂ.',
      region: 'Gram Panchayat/ Other',
      isActive: false,
      children: [
        {
          name: 'Dry, No Source of Irrigation, Black Soil',
          rate: '3,95,000.00',
          unit: 'Acres'
        },
        {
          name: 'Non Agricultural Land',
          rate: '0.00',
          unit: 'Acres'
        }
      ]
    },
    {
      name: 'Afzalpur Purasaba Limit Gramathana Sy. No.',
      rname: 'ಅಫಜಲಪುರ ಪುರಸಬಾ ಮಿತಿ ಗ್ರಾಮಠಾಣಾ ಸೈ. ಸಂ.',
      region: 'Gram Panchayat/ Other',
      isActive: false,
      children: [
        {
          name: 'Non Agricultural Land',
          rate: '0.00',
          unit: 'Acres'
        }
      ]
    }
  ]


  ngOnInit(): void {
  }

  addRecord() {

  }

}
