"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DiagonalHedgePage() {
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
                  {/* Table rows will be dynamically added here */}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}