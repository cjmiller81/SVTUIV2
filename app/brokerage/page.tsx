"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

export default function BrokeragePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-[#1F2937] bg-[#0B0F17] p-8">
        <h1 className="text-2xl font-bold text-white">
          Brokerage Connections
        </h1>
      </div>
      <div className="flex-1 bg-[#090D14] p-8">
        <Card className="bg-[#0B0F17] border-[#1F2937] text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold">Brokerage Connections</h2>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white hover:bg-gray-100 text-black text-xs font-medium"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Connection
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#1F2937]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#1F2937] hover:bg-transparent">
                    <TableHead className="text-gray-400 font-medium">Firm</TableHead>
                    <TableHead className="text-gray-400 font-medium">Username</TableHead>
                    <TableHead className="text-gray-400 font-medium">Account #</TableHead>
                    <TableHead className="text-gray-400 font-medium">Status</TableHead>
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

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0F1724] border-[#1F2937] text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Add New Brokerage Connection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Firm</label>
                <Select>
                  <SelectTrigger className="bg-[#1F2937] border-[#374151] focus:ring-offset-[#0F1724]">
                    <SelectValue placeholder="Select a brokerage firm" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-[#374151]">
                    <SelectItem value="tastytrade">Tastytrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Username</label>
                <Input 
                  className="bg-[#1F2937] border-[#374151] text-white focus:ring-offset-[#0F1724]" 
                  placeholder="Enter your username"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Account #</label>
                <Input 
                  className="bg-[#1F2937] border-[#374151] text-white focus:ring-offset-[#0F1724]" 
                  placeholder="Enter your account number"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-gray-400">Password</label>
                <Input 
                  type="password"
                  className="bg-[#1F2937] border-[#374151] text-white focus:ring-offset-[#0F1724]" 
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              >
                Add Connection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}