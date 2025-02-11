"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Timer, AlertCircle } from "lucide-react";
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

interface Strategy {
  id: string;
  brokerage: string;
  username: string;
  accountNumber: string;
  tradeSymbol: string;
  spreadType: string;
  tradeEntryTime: string;
}

export default function ZeroDTEMechanicalPage() {
  const [open, setOpen] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [formData, setFormData] = useState({
    brokerage: '',
    accountNumber: '',
    tradeSymbol: '',
    spreadType: '',
    tradeEntryTime: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-[#1F2937] bg-[#0B0F17] p-8">
        <h1 className="text-2xl font-bold text-white">
          0DTE Mechanical Strategy
        </h1>
      </div>
      <div className="flex-1 bg-[#090D14] p-8">
        <Card className="bg-[#0B0F17] border-[#1F2937] text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Timer className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold">0DTE Mechanical</h2>
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
              {/* Content will go here */}
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
                <Select
                  value={formData.tradeSymbol}
                  onValueChange={(value) => handleInputChange('tradeSymbol', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select a symbol" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="SPX">SPX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-start justify-between">
                  <label className="text-sm text-gray-400">Spread Type</label>
                  {formData.spreadType === 'strangle' && (
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      <span>High capital requirement</span>
                    </div>
                  )}
                </div>
                <Select
                  value={formData.spreadType}
                  onValueChange={(value) => handleInputChange('spreadType', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select spread type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="ironCondor">Iron Condor</SelectItem>
                    <SelectItem value="strangle">Strangle</SelectItem>
                  </SelectContent>
                </Select>
                {formData.spreadType === 'strangle' && (
                  <p className="text-xs text-red-400 mt-1">
                    WARNING: SPX Strangles require significant buying power. Ensure you have enough capital or manage your own hedge.
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Trade Entry Time</label>
                <Select
                  value={formData.tradeEntryTime}
                  onValueChange={(value) => handleInputChange('tradeEntryTime', value)}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select entry time" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="market_open_2">Market open +2min</SelectItem>
                    <SelectItem value="market_open_14">Market open +14min</SelectItem>
                    <SelectItem value="market_open_29">Market open +29min (default)</SelectItem>
                    <SelectItem value="market_open_44">Market open +44min</SelectItem>
                    <SelectItem value="market_open_59">Market open +59min</SelectItem>
                    <SelectItem value="market_open_74">Market open +74min</SelectItem>
                    <SelectItem value="market_open_89">Market open +89min</SelectItem>
                    <SelectItem value="market_open_104">Market open +104min</SelectItem>
                    <SelectItem value="market_open_119">Market open +119min</SelectItem>
                    <SelectItem value="market_open_134">Market open +134min</SelectItem>
                    <SelectItem value="market_open_149">Market open +149min</SelectItem>
                    <SelectItem value="market_open_164">Market open +164min</SelectItem>
                    <SelectItem value="market_open_179">Market open +179min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}