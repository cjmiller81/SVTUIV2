"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Timer, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
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

interface StrikeSelection {
  type: 'Put' | 'Call';
  action: 'Buy' | 'Sell';
  targetCredit: number | null;
  strikeDistance: number | null;
  stopLoss: number | null;
}

interface Strategy {
  id: string;
  brokerage: string;
  username: string;
  accountNumber: string;
  tradeSymbol: string;
  spreadType: string;
  tradeEntryTime: string;
  strikeSelections: StrikeSelection[];
}

const defaultStrikeSelections: StrikeSelection[] = [
  { type: 'Put', action: 'Sell', targetCredit: 1.75, strikeDistance: null, stopLoss: 1.75 },
  { type: 'Put', action: 'Buy', targetCredit: null, strikeDistance: 150, stopLoss: null },
  { type: 'Call', action: 'Sell', targetCredit: 1.50, strikeDistance: null, stopLoss: 1.50 },
  { type: 'Call', action: 'Buy', targetCredit: null, strikeDistance: 150, stopLoss: null }
];

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
  const [strikeSelections, setStrikeSelections] = useState<StrikeSelection[]>(defaultStrikeSelections);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStrikeSelectionChange = (index: number, field: keyof StrikeSelection, value: any) => {
    setStrikeSelections(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '';
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number | null) => {
    if (value === null) return '';
    return `${value.toFixed(2)}%`;
  };

  const handleNumberInput = (
    index: number,
    field: 'targetCredit' | 'strikeDistance' | 'stopLoss',
    value: string,
    step: number
  ) => {
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    if (!isNaN(numericValue)) {
      handleStrikeSelectionChange(index, field, numericValue);
    }
  };

  const adjustValue = (
    index: number,
    field: 'targetCredit' | 'strikeDistance' | 'stopLoss',
    increment: boolean,
    step: number
  ) => {
    const selection = strikeSelections[index];
    const currentValue = selection[field] || 0;
    const newValue = increment ? currentValue + step : currentValue - step;
    handleStrikeSelectionChange(index, field, newValue);
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
          <DialogContent className="bg-[#0F1724] border-[#1F2937] text-white sm:max-w-[525px]">
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
                <label className="text-sm text-gray-400">Strike Selection</label>
                <div className="rounded-md border border-[#1F2937] overflow-hidden">
                  <div className="grid grid-cols-5 gap-0.5 bg-[#1F2937] p-2 text-xs font-medium text-gray-400">
                    <div className="text-center">Type</div>
                    <div className="text-center">Action</div>
                    <div className="text-center">Target Credit</div>
                    <div className="text-center">Strike Distance</div>
                    <div className="text-center">Stop Loss%</div>
                  </div>
                  <div className="divide-y divide-[#1F2937]">
                    {strikeSelections.map((selection, index) => (
                      <div key={index} className="grid grid-cols-5 gap-0.5 p-2">
                        <div className={`flex items-center justify-center px-2 py-1 rounded text-sm ${
                          selection.action === 'Sell' 
                            ? 'bg-red-100 text-red-900' 
                            : 'bg-green-100 text-green-900'
                        }`}>
                          {selection.type}
                        </div>
                        <div className={`flex items-center justify-center px-2 py-1 rounded text-sm text-white ${
                          selection.action === 'Sell' 
                            ? 'bg-red-600' 
                            : 'bg-green-600'
                        }`}>
                          {selection.action}
                        </div>
                        <div className="relative">
                          {selection.action === 'Sell' && (
                            <div className="flex">
                              <Input
                                type="text"
                                value={formatCurrency(selection.targetCredit)}
                                onChange={(e) => handleNumberInput(index, 'targetCredit', e.target.value, 0.05)}
                                className="bg-[#1F2937] border-[#374151] text-white w-full pr-8 text-center"
                              />
                              <div className="absolute right-0 inset-y-0 flex flex-col border-l border-[#374151]">
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400"
                                  onClick={() => adjustValue(index, 'targetCredit', true, 0.05)}
                                >
                                  <ChevronUp className="h-3 w-3" />
                                </button>
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400 border-t border-[#374151]"
                                  onClick={() => adjustValue(index, 'targetCredit', false, 0.05)}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {selection.action === 'Buy' && (
                            <div className="flex">
                              <Input
                                type="text"
                                value={selection.strikeDistance?.toString() || ''}
                                onChange={(e) => handleNumberInput(index, 'strikeDistance', e.target.value, 5)}
                                className="bg-[#1F2937] border-[#374151] text-white w-full pr-8 text-center"
                              />
                              <div className="absolute right-0 inset-y-0 flex flex-col border-l border-[#374151]">
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400"
                                  onClick={() => adjustValue(index, 'strikeDistance', true, 5)}
                                >
                                  <ChevronUp className="h-3 w-3" />
                                </button>
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400 border-t border-[#374151]"
                                  onClick={() => adjustValue(index, 'strikeDistance', false, 5)}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {selection.action === 'Sell' && (
                            <div className="flex">
                              <Input
                                type="text"
                                value={formatPercentage(selection.stopLoss)}
                                onChange={(e) => handleNumberInput(index, 'stopLoss', e.target.value, 0.01)}
                                className="bg-[#1F2937] border-[#374151] text-white w-full pr-8 text-center"
                              />
                              <div className="absolute right-0 inset-y-0 flex flex-col border-l border-[#374151]">
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400"
                                  onClick={() => adjustValue(index, 'stopLoss', true, 0.01)}
                                >
                                  <ChevronUp className="h-3 w-3" />
                                </button>
                                <button
                                  className="flex-1 px-2 hover:bg-[#374151] text-gray-400 border-t border-[#374151]"
                                  onClick={() => adjustValue(index, 'stopLoss', false, 0.01)}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                onClick={() => {
                  // Handle strategy creation
                  setOpen(false);
                }}
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