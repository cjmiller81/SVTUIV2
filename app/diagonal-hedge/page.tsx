"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Strategy {
  id: string;
  brokerage: string;
  accountNumber: string;
  tradeSymbol: string;
  allocationValue: string;
  preset: string;
  status: 'Active' | 'Inactive';
  forceRebalance: boolean;
}

const formatCurrency = (value: string): string => {
  // Remove any non-digit characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '');
  
  // Convert to number and format with commas
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(numericValue) || 0);

  return formatted;
};

export default function DiagonalHedgePage() {
  const [open, setOpen] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [formData, setFormData] = useState({
    brokerage: '',
    accountNumber: '',
    tradeSymbol: '',
    preset: '',
    allocationValue: '$0'
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === 'allocationValue') {
      // Format the value with commas
      const formattedValue = formatCurrency(value);
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddStrategy = () => {
    const newStrategy: Strategy = {
      id: crypto.randomUUID(),
      brokerage: formData.brokerage,
      accountNumber: formData.accountNumber,
      tradeSymbol: formData.tradeSymbol,
      allocationValue: formData.allocationValue,
      preset: formData.preset,
      status: 'Active',
      forceRebalance: false
    };

    setStrategies(prev => [...prev, newStrategy]);
    setFormData({
      brokerage: '',
      accountNumber: '',
      tradeSymbol: '',
      preset: '',
      allocationValue: '$0'
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-[#1F2937] bg-[#0B0F17] p-8">
        <h1 className="text-2xl font-bold text-white">
          Diagonal Hedge Strategy
        </h1>
      </div>
      <div className="flex-1 bg-[#090D14] p-8">
        <Card className="bg-[#0B0F17] border-[#1F2937] text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <ArrowDownUp className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Diagonal Hedge</h2>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white hover:bg-gray-100 text-black text-xs font-medium"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Strategy
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#1F2937]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#1F2937] hover:bg-transparent">
                    <TableHead className="text-gray-400 font-medium">Brokerage</TableHead>
                    <TableHead className="text-gray-400 font-medium">Account #</TableHead>
                    <TableHead className="text-gray-400 font-medium">Trade Symbol</TableHead>
                    <TableHead className="text-gray-400 font-medium">Allocation Value</TableHead>
                    <TableHead className="text-gray-400 font-medium">Preset</TableHead>
                    <TableHead className="text-gray-400 font-medium">Status</TableHead>
                    <TableHead className="text-gray-400 font-medium">Force Rebalance</TableHead>
                    <TableHead className="text-gray-400 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategies.map((strategy) => (
                    <TableRow key={strategy.id} className="border-b border-[#1F2937] hover:bg-[#1F2937]/50">
                      <TableCell className="font-medium text-white capitalize">{strategy.brokerage}</TableCell>
                      <TableCell className="text-white">{strategy.accountNumber}</TableCell>
                      <TableCell className="text-white">{strategy.tradeSymbol}</TableCell>
                      <TableCell className="text-white">{strategy.allocationValue}</TableCell>
                      <TableCell className="text-white">{strategy.preset}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          strategy.status === 'Active' 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-red-900/50 text-red-400'
                        }`}>
                          {strategy.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">
                        {strategy.forceRebalance ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-[#1F2937] hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0F1724] border-[#1F2937] text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Add New Strategy</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Brokerage</label>
                <Select
                  value={formData.brokerage}
                  onValueChange={(value) => handleInputChange('brokerage', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select a brokerage" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="tastytrade">Tastytrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Account #</label>
                <Select
                  value={formData.accountNumber}
                  onValueChange={(value) => handleInputChange('accountNumber', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="12345">12345</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Trade Symbol</label>
                <Input 
                  className="bg-[#1F2937] border-[#374151] text-white focus:ring-offset-[#0F1724]" 
                  placeholder="Enter trade symbol"
                  value={formData.tradeSymbol}
                  onChange={(e) => handleInputChange('tradeSymbol', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Preset</label>
                <Select
                  value={formData.preset}
                  onValueChange={(value) => handleInputChange('preset', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select a preset" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    {/* Preset items will be added later */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Allocation Value</label>
                <Input 
                  className="bg-[#1F2937] border-[#374151] text-white focus:ring-offset-[#0F1724]" 
                  placeholder="Enter allocation value"
                  value={formData.allocationValue}
                  onChange={(e) => handleInputChange('allocationValue', e.target.value)}
                />
              </div>
              <Button 
                className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={handleAddStrategy}
              >
                Add Strategy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}