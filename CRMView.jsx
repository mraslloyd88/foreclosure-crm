
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function CRMView() {
  const [listType, setListType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Placeholder: Here you would parse the CSV and map into uploadedData
    setUploadedData([
      {
        address: "1158 Oakdale Dr, Asheboro, NC 27205",
        county: "RANDOLPH",
        auctionDate: "4/2/25",
        contacts: [
          {
            name: "Sidney Hugh Beane",
            isOwner: true,
            isDeceased: false,
          },
          {
            name: "Cynthia Lynn Beane",
            isOwner: false,
            isDeceased: false,
          },
        ],
      },
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">CRM Upload & Mapping</h1>

      <div className="space-y-4">
        <Label>What type of list is this?</Label>
        <Select value={listType} onValueChange={setListType}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select list type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auction">Auction Date List</SelectItem>
            <SelectItem value="str">Substitution of Trustee / NOD</SelectItem>
          </SelectContent>
        </Select>

        <Label className="mt-4">Upload your CSV file:</Label>
        <Input type="file" accept=".csv" onChange={handleFileChange} className="max-w-sm" />
      </div>

      {uploadedData.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mapped Records</h2>
          {uploadedData.map((property, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <p className="font-bold">{property.address}</p>
                <p>County: {property.county}</p>
                <p>Auction Date: {property.auctionDate}</p>
                <h3 className="mt-4 font-semibold">Contacts</h3>
                {property.contacts.map((contact, i) => (
                  <div key={i} className="mt-2 border-b pb-2">
                    <p>Name: {contact.name}</p>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={contact.isOwner}
                          onChange={() => toggleOwner(index, i)}
                        />
                        Owner
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={contact.isDeceased}
                          onChange={() => toggleDeceased(index, i)}
                        />
                        Deceased
                      </label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
