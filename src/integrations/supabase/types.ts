export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          issuing_authority: string | null
          name: string
          validity_period_months: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_authority?: string | null
          name: string
          validity_period_months?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_authority?: string | null
          name?: string
          validity_period_months?: number | null
        }
        Relationships: []
      }
      commodity_grades: {
        Row: {
          created_at: string | null
          defect_tolerance: number | null
          grade_code: string
          grade_name: string
          id: string
          moisture_content: number | null
          product_id: string | null
          size_range: string | null
        }
        Insert: {
          created_at?: string | null
          defect_tolerance?: number | null
          grade_code: string
          grade_name: string
          id?: string
          moisture_content?: number | null
          product_id?: string | null
          size_range?: string | null
        }
        Update: {
          created_at?: string | null
          defect_tolerance?: number | null
          grade_code?: string
          grade_name?: string
          id?: string
          moisture_content?: number | null
          product_id?: string | null
          size_range?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commodity_grades_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_planning: {
        Row: {
          created_at: string | null
          expected_harvest_date: string | null
          expected_yield: number | null
          farm_id: string | null
          id: string
          planned_area: number | null
          planting_date: string | null
          product_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          expected_harvest_date?: string | null
          expected_yield?: number | null
          farm_id?: string | null
          id?: string
          planned_area?: number | null
          planting_date?: string | null
          product_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          expected_harvest_date?: string | null
          expected_yield?: number | null
          farm_id?: string | null
          id?: string
          planned_area?: number | null
          planting_date?: string | null
          product_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_planning_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crop_planning_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_inputs: {
        Row: {
          application_date: string | null
          cost: number | null
          created_at: string | null
          farm_id: string | null
          id: string
          input_name: string
          input_type: string
          quantity: number | null
          supplier: string | null
          unit: string | null
        }
        Insert: {
          application_date?: string | null
          cost?: number | null
          created_at?: string | null
          farm_id?: string | null
          id?: string
          input_name: string
          input_type: string
          quantity?: number | null
          supplier?: string | null
          unit?: string | null
        }
        Update: {
          application_date?: string | null
          cost?: number | null
          created_at?: string | null
          farm_id?: string | null
          id?: string
          input_name?: string
          input_type?: string
          quantity?: number | null
          supplier?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_inputs_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string | null
          farmer_id: string | null
          id: string
          irrigation_type: string | null
          location: Json
          name: string
          soil_type: string | null
          total_area: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          irrigation_type?: string | null
          location: Json
          name: string
          soil_type?: string | null
          total_area: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          irrigation_type?: string | null
          location?: Json
          name?: string
          soil_type?: string | null
          total_area?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farms_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          batch_number: string | null
          id: string
          movement_date: string | null
          movement_type: string
          notes: string | null
          product_id: string | null
          quantity: number | null
          reference_order_id: string | null
          warehouse_id: string | null
        }
        Insert: {
          batch_number?: string | null
          id?: string
          movement_date?: string | null
          movement_type: string
          notes?: string | null
          product_id?: string | null
          quantity?: number | null
          reference_order_id?: string | null
          warehouse_id?: string | null
        }
        Update: {
          batch_number?: string | null
          id?: string
          movement_date?: string | null
          movement_type?: string
          notes?: string | null
          product_id?: string | null
          quantity?: number | null
          reference_order_id?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_reference_order_id_fkey"
            columns: ["reference_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          available_quantity: number
          certifications: string[] | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          location: Json | null
          minimum_order: number
          price_per_unit: number
          product_id: string
          quality_grade: string | null
          seller_id: string
          title: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          available_quantity: number
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location?: Json | null
          minimum_order?: number
          price_per_unit: number
          product_id: string
          quality_grade?: string | null
          seller_id: string
          title: string
          unit?: string
          updated_at?: string | null
        }
        Update: {
          available_quantity?: number
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location?: Json | null
          minimum_order?: number
          price_per_unit?: number
          product_id?: string
          quality_grade?: string | null
          seller_id?: string
          title?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_intelligence: {
        Row: {
          analysis_date: string | null
          average_price: number | null
          created_at: string | null
          data_sources: string[] | null
          demand_level: string | null
          id: string
          market_location: string | null
          price_trend: string | null
          product_id: string | null
          supply_level: string | null
        }
        Insert: {
          analysis_date?: string | null
          average_price?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          demand_level?: string | null
          id?: string
          market_location?: string | null
          price_trend?: string | null
          product_id?: string | null
          supply_level?: string | null
        }
        Update: {
          analysis_date?: string | null
          average_price?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          demand_level?: string | null
          id?: string
          market_location?: string | null
          price_trend?: string | null
          product_id?: string | null
          supply_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "market_intelligence_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          order_id: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          order_id?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          order_id?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          source: string | null
          summary: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string | null
          delivery_address: Json
          id: string
          listing_id: string
          notes: string | null
          order_number: string
          payment_terms: string | null
          quality_test_type:
            | Database["public"]["Enums"]["quality_test_type"]
            | null
          quantity: number
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string | null
          delivery_address: Json
          id?: string
          listing_id: string
          notes?: string | null
          order_number: string
          payment_terms?: string | null
          quality_test_type?:
            | Database["public"]["Enums"]["quality_test_type"]
            | null
          quantity: number
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string | null
          delivery_address?: Json
          id?: string
          listing_id?: string
          notes?: string | null
          order_number?: string
          payment_terms?: string | null
          quality_test_type?:
            | Database["public"]["Enums"]["quality_test_type"]
            | null
          quantity?: number
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          order_id: string | null
          payee_id: string | null
          payer_id: string | null
          payment_method: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          payee_id?: string | null
          payer_id?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          payee_id?: string | null
          payer_id?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_payee_id_fkey"
            columns: ["payee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      price_alerts: {
        Row: {
          alert_type: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          product_id: string | null
          target_price: number | null
          user_id: string | null
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          product_id?: string | null
          target_price?: number | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          product_id?: string | null
          target_price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_alerts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          id: string
          location: string
          market_source: string | null
          price: number
          product_id: string
          recorded_at: string | null
          unit: string
        }
        Insert: {
          id?: string
          location: string
          market_source?: string | null
          price: number
          product_id: string
          recorded_at?: string | null
          unit?: string
        }
        Update: {
          id?: string
          location?: string
          market_source?: string | null
          price?: number
          product_id?: string
          recorded_at?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      processing_batches: {
        Row: {
          batch_number: string
          created_at: string | null
          facility_id: string | null
          id: string
          processed_quantity: number | null
          processing_date: string | null
          product_id: string | null
          quality_grade: string | null
          raw_material_quantity: number | null
          status: string | null
        }
        Insert: {
          batch_number: string
          created_at?: string | null
          facility_id?: string | null
          id?: string
          processed_quantity?: number | null
          processing_date?: string | null
          product_id?: string | null
          quality_grade?: string | null
          raw_material_quantity?: number | null
          status?: string | null
        }
        Update: {
          batch_number?: string
          created_at?: string | null
          facility_id?: string | null
          id?: string
          processed_quantity?: number | null
          processing_date?: string | null
          product_id?: string | null
          quality_grade?: string | null
          raw_material_quantity?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processing_batches_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "processing_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "processing_batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      processing_facilities: {
        Row: {
          capacity: number | null
          capacity_unit: string | null
          certifications: string[] | null
          created_at: string | null
          facility_type: string
          id: string
          location: Json
          name: string
          operator_id: string | null
        }
        Insert: {
          capacity?: number | null
          capacity_unit?: string | null
          certifications?: string[] | null
          created_at?: string | null
          facility_type: string
          id?: string
          location: Json
          name: string
          operator_id?: string | null
        }
        Update: {
          capacity?: number | null
          capacity_unit?: string | null
          certifications?: string[] | null
          created_at?: string | null
          facility_type?: string
          id?: string
          location?: Json
          name?: string
          operator_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processing_facilities_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          grade: string | null
          harvest_season: string | null
          id: string
          image_urls: string[] | null
          name: string
          processing_type: string | null
          quality_certifications: string[] | null
          shelf_life_days: number | null
          specifications: Json | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          grade?: string | null
          harvest_season?: string | null
          id?: string
          image_urls?: string[] | null
          name: string
          processing_type?: string | null
          quality_certifications?: string[] | null
          shelf_life_days?: number | null
          specifications?: Json | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          grade?: string | null
          harvest_season?: string | null
          id?: string
          image_urls?: string[] | null
          name?: string
          processing_type?: string | null
          quality_certifications?: string[] | null
          shelf_life_days?: number | null
          specifications?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          address: Json | null
          company_name: string | null
          created_at: string | null
          full_name: string
          id: string
          kyc_documents: Json | null
          phone: string | null
          preferred_language: string | null
          profile_image_url: string | null
          updated_at: string | null
          user_id: string
          user_role: Database["public"]["Enums"]["user_role"]
          verification_status: string | null
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          address?: Json | null
          company_name?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          kyc_documents?: Json | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_id: string
          user_role?: Database["public"]["Enums"]["user_role"]
          verification_status?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          address?: Json | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          kyc_documents?: Json | null
          phone?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_id?: string
          user_role?: Database["public"]["Enums"]["user_role"]
          verification_status?: string | null
        }
        Relationships: []
      }
      quality_inspections: {
        Row: {
          certificate_url: string | null
          id: string
          inspection_date: string | null
          inspection_result: string | null
          inspection_type: string | null
          inspector_id: string | null
          order_id: string | null
          quality_parameters: Json | null
        }
        Insert: {
          certificate_url?: string | null
          id?: string
          inspection_date?: string | null
          inspection_result?: string | null
          inspection_type?: string | null
          inspector_id?: string | null
          order_id?: string | null
          quality_parameters?: Json | null
        }
        Update: {
          certificate_url?: string | null
          id?: string
          inspection_date?: string | null
          inspection_result?: string | null
          inspection_type?: string | null
          inspector_id?: string | null
          order_id?: string | null
          quality_parameters?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_inspections_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_inspections_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_tests: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          inspector_id: string | null
          order_id: string
          scheduled_at: string | null
          status: string | null
          test_images: string[] | null
          test_results: Json | null
          test_type: Database["public"]["Enums"]["quality_test_type"]
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          inspector_id?: string | null
          order_id: string
          scheduled_at?: string | null
          status?: string | null
          test_images?: string[] | null
          test_results?: Json | null
          test_type: Database["public"]["Enums"]["quality_test_type"]
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          inspector_id?: string | null
          order_id?: string
          scheduled_at?: string | null
          status?: string | null
          test_images?: string[] | null
          test_results?: Json | null
          test_type?: Database["public"]["Enums"]["quality_test_type"]
        }
        Relationships: [
          {
            foreignKeyName: "quality_tests_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_tests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_financing: {
        Row: {
          borrower_id: string | null
          collateral_details: Json | null
          created_at: string | null
          id: string
          interest_rate: number | null
          loan_amount: number | null
          loan_purpose: string | null
          repayment_period_months: number | null
          status: string | null
        }
        Insert: {
          borrower_id?: string | null
          collateral_details?: Json | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number | null
          loan_purpose?: string | null
          repayment_period_months?: number | null
          status?: string | null
        }
        Update: {
          borrower_id?: string | null
          collateral_details?: Json | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number | null
          loan_purpose?: string | null
          repayment_period_months?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trade_financing_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_communications: {
        Row: {
          attachments: string[] | null
          content: string | null
          created_at: string | null
          id: string
          message_type: string | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          attachments?: string[] | null
          content?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          attachments?: string[] | null
          content?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_communications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_communications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          available_capacity: number | null
          certifications: string[] | null
          created_at: string | null
          id: string
          location: Json
          name: string
          owner_id: string | null
          storage_conditions: Json | null
          total_capacity: number | null
        }
        Insert: {
          available_capacity?: number | null
          certifications?: string[] | null
          created_at?: string | null
          id?: string
          location: Json
          name: string
          owner_id?: string | null
          storage_conditions?: Json | null
          total_capacity?: number | null
        }
        Update: {
          available_capacity?: number | null
          certifications?: string[] | null
          created_at?: string | null
          id?: string
          location?: Json
          name?: string
          owner_id?: string | null
          storage_conditions?: Json | null
          total_capacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "warehouses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "seller" | "buyer" | "both"
      order_status:
        | "pending"
        | "confirmed"
        | "quality_check"
        | "payment_pending"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "disputed"
      quality_test_type: "basic" | "advanced" | "premium"
      user_role:
        | "farmer"
        | "trader"
        | "corporate"
        | "processor"
        | "logistics"
        | "financial_partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["seller", "buyer", "both"],
      order_status: [
        "pending",
        "confirmed",
        "quality_check",
        "payment_pending",
        "shipped",
        "delivered",
        "cancelled",
        "disputed",
      ],
      quality_test_type: ["basic", "advanced", "premium"],
      user_role: [
        "farmer",
        "trader",
        "corporate",
        "processor",
        "logistics",
        "financial_partner",
      ],
    },
  },
} as const
