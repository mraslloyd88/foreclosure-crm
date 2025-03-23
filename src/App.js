import React, { useState } from "react";

export default function CRMView() {
  const [listType, setListType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Mocked data
    setUploadedData([
      {
        address: "1158 Oakdale Dr, Asheboro, NC 27205",
        county: "RANDOLPH",
        auctionDate: "4/2/25",
        contacts: [
          { name: "Sidney Hugh Beane", isOwner: true, isDeceased: false },
          { name: "Cynthia Lynn Beane", isOwner: false, isDeceased: false },
        ]
      }
    ]);
  };

  const toggleOwner = (index, contactIndex) => {
    const updated = [...uploadedData];
    updated[index].contacts[contactIndex].isOwner = !updated[index].contacts[contactIndex].isOwner;
    setUploadedData(updated);
  };

  const toggleDeceased = (index, contactIndex) => {
    const updated = [...uploadedData];
    updated[index].contacts[contactIndex].isDeceased = !updated[index].contacts[contactIndex].isDeceased;
    setUploadedData(updated);
  };

  return (
    <div>
      <h1>CRM Upload & Mapping</h1>

      <label>What type of list is this?</label>
      <select value={listType} onChange={(e) => setListType(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="auction">Auction Date List</option>
        <option value="str">Substitution of Trustee / NOD</option>
      </select>

      <br /><br />

      <label>Upload your CSV file:</label>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {uploadedData.length > 0 && (
        <div>
          <h2>Mapped Records</h2>
          {uploadedData.map((property, index) => (
            <div key={index} className="card">
              <strong>{property.address}</strong>
              <p>County: {property.county}</p>
              <p>Auction Date: {property.auctionDate}</p>
              <h4>Contacts:</h4>
              {property.contacts.map((contact, i) => (
                <div key={i}>
                  <p>Name: {contact.name}</p>
                  <label>
                    <input
                      type="checkbox"
                      checked={contact.isOwner}
                      onChange={() => toggleOwner(index, i)}
                    /> Owner
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={contact.isDeceased}
                      onChange={() => toggleDeceased(index, i)}
                    /> Deceased
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
