"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Item {
  id: string;
  name: string | null;
  description: string | null;
}

// Assuming your API base URL is stored in an environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export default function ItemDashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({
    name: "",
    description: "",
  });
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast({
        title: "Error",
        description: "Failed to fetch items. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.description) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/items`, newItem);
        setItems([...items, response.data]);
        setNewItem({ name: "", description: "" });
        toast({
          title: "Success",
          description: "Item added successfully.",
        });
      } catch (error) {
        console.error("Error adding item:", error);
        toast({
          title: "Error",
          description: "Failed to add item. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast({
        title: "Success",
        description: "Item deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startEditing = (item: Item) => {
    setEditingItem(item);
  };

  const saveEdit = async () => {
    if (editingItem) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/items/${editingItem.id}`,
          editingItem
        );
        setItems(
          items.map((item) =>
            item.id === editingItem.id ? response.data : item
          )
        );
        setEditingItem(null);
        toast({
          title: "Success",
          description: "Item updated successfully.",
        });
      } catch (error) {
        console.error("Error updating item:", error);
        toast({
          title: "Error",
          description: "Failed to update item. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Items Dashboard</h1>

      <form onSubmit={addItem} className="space-y-2">
        <Input
          type="text"
          placeholder="Item Name"
          value={newItem.name || ""}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Item Description"
          value={newItem.description || ""}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          className="w-full"
        />
        <Button type="submit" className="w-full">
          Add Item
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name || "No name"}</TableCell>
              <TableCell>
                {editingItem && editingItem.id === item.id ? (
                  <Input
                    value={editingItem.description || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.description || "No description"
                )}
              </TableCell>
              <TableCell>
                {editingItem && editingItem.id === item.id ? (
                  <Button onClick={saveEdit} variant="outline" size="sm">
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => startEditing(item)}
                    variant="outline"
                    size="icon"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  onClick={() => deleteItem(item.id)}
                  variant="outline"
                  size="icon"
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
