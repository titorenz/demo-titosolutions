"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface Engagement {
  id?: number;
  value: string;
  suffix: string;
  label: string;
}

export default function EngagementEditor() {
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [currentEngagement, setCurrentEngagement] = useState<Engagement>({
    value: "",
    suffix: "",
    label: "",
  });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    fetchEngagements();
  }, []);

  async function fetchEngagements() {
    const { data, error } = await supabase
      .from("engagements")
      .select("*")
      .order("id");

    if (error) {
      console.error("Error fetching engagements:", error);
    } else {
      setEngagements(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      const { error } = await supabase
        .from("engagements")
        .update(currentEngagement)
        .eq("id", editingId);

      if (error) {
        console.error("Error updating engagement:", error);
      } else {
        setEngagements(
          engagements.map((eng) =>
            eng.id === editingId ? currentEngagement : eng
          )
        );
        setEditingId(null);
      }
    } else if (engagements.length < 6) {
      const { data, error } = await supabase
        .from("engagements")
        .insert([currentEngagement])
        .select();

      if (error) {
        console.error("Error adding engagement:", error);
      } else {
        setEngagements([...engagements, data[0]]);
      }
    } else {
      alert(
        "Maximum of 6 engagements reached. Please edit or delete existing ones."
      );
    }

    setCurrentEngagement({ value: "", suffix: "", label: "" });
    setLoading(false);
  }

  async function handleDelete(id: number) {
    setLoading(true);

    const { error } = await supabase.from("engagements").delete().eq("id", id);

    if (error) {
      console.error("Error deleting engagement:", error);
    } else {
      setEngagements(engagements.filter((eng) => eng.id !== id));
    }
    setLoading(false);
    setDeleteConfirmation(null);
  }

  function handleEdit(engagement: Engagement) {
    setCurrentEngagement(engagement);
    setEditingId(engagement.id!);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Value"
          value={currentEngagement.value}
          onChange={(e) =>
            setCurrentEngagement({
              ...currentEngagement,
              value: e.target.value,
            })
          }
          required
        />
        <Input
          placeholder="Suffix, e.g. $, M, k, x, +"
          value={currentEngagement.suffix}
          onChange={(e) =>
            setCurrentEngagement({
              ...currentEngagement,
              suffix: e.target.value,
            })
          }
        />
        <Input
          placeholder="Label"
          value={currentEngagement.label}
          onChange={(e) =>
            setCurrentEngagement({
              ...currentEngagement,
              label: e.target.value,
            })
          }
          required
        />
        <Button type="submit">
          {editingId ? "Update Engagement" : "Add Engagement"}
        </Button>
        {editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEditingId(null);
              setCurrentEngagement({ value: "", suffix: "", label: "" });
            }}
          >
            Cancel Edit
          </Button>
        )}
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {engagements.map((engagement) => (
          <Card key={engagement.id}>
            <CardHeader>
              <CardTitle>{engagement.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {engagement.value}
                <span className="text-xl">{engagement.suffix}</span>
              </p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => handleEdit(engagement)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    setDeleteConfirmation({
                      id: engagement.id!,
                      label: engagement.label,
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {deleteConfirmation && (
        <DeleteConfirmationModal
          isOpen={!!deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDelete(deleteConfirmation.id)}
          itemName={`engagement "${deleteConfirmation.label}"`}
        />
      )}
    </div>
  );
}
