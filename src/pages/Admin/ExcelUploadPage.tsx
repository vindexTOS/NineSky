import React, { useState } from 'react';
import * as XLSX from 'xlsx';
export default function ExcelUploadPage() {
    const [data, setData] = useState<any>([]);

    const handleFileChange = (e:any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const binaryStr = event?.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setData(jsonData);
      };
  
      reader.readAsBinaryString(file);
    };
  
    return (
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <table>
          <thead>
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row:any, index:any) => (
              <tr key={index}>
                {Object.values(row).map((value:any, i:any) => <td key={i}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
