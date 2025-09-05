import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  rollNumber: string;
  device: string;
}

const EntryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rollNumber: "",
    device: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.rollNumber && formData.device) {
      // Pass data through navigation state
      navigate("/confirmation", { state: formData });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Student Entry System
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              THAPAR UNIVERSITY - AUTHORIZED SYSTEM
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="device">Device Type</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, device: value }))} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phone - Android">Phone - Android</SelectItem>
                    <SelectItem value="Phone - MacOS">Phone - MacOS</SelectItem>
                    <SelectItem value="Tablet - Android">Tablet - Android</SelectItem>
                    <SelectItem value="Tablet - iOS">Tablet - iOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-entry hover:bg-gradient-entry-light text-success-foreground font-semibold py-3 mt-6"
                disabled={!formData.name || !formData.rollNumber || !formData.device}
              >
                Record Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryForm;