"use client";
import { HomeLink } from "@/modules/home/home-link";
import { useState } from "react";
import { useSiteData } from "@/components/content";
import {
  matchesHotelFilter,
  type HomeHotelFilter,
} from "@/modules/home/hotel-filter";
import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function HomeHotels() {
  const [filter, setFilter] = useState<HomeHotelFilter>("all");
  const products = useSiteData().products.filter(
    (p) =>
      p.collection_id === "home-collection-2" && matchesHotelFilter(p, filter),
  );
  return (
    <section id="home-hotels" className="site-container py-10 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            <ContentText contentKey="home.text-095" />
          </h2>
          <div className="w-7 h-1 rounded-full bg-primary mt-2" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(
            [
              "all",
              "cam-ranh",
              "nha-trang",
              "beach",
              "pool",
            ] as HomeHotelFilter[]
          ).map((value, index) => (
            <button
              key={value}
              type="button"
              data-hotel-filter={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`hotel-filter shrink-0 px-4 py-2 rounded-full font-label-md text-label-md font-bold transition-colors ${
                filter === value
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest border border-border-light text-on-surface hover:border-primary/50"
              }`}
            >
              <ContentText
                contentKey={"home.text-" + String(96 + index).padStart(3, "0")}
              />
            </button>
          ))}
          <HomeLink
            contentKey="home.attributes-007"
            className="px-4 py-2 rounded-full text-secondary hover:text-ocean-deep font-label-md text-label-md font-bold flex items-center gap-1 whitespace-nowrap"
            href="/khach-san"
          >
            <span>
              <ContentText contentKey="home.text-101" />
            </span>
            <span className="material-symbols-outlined text-[16px]">
              {"arrow_forward"}
            </span>
          </HomeLink>
        </div>
      </div>

      <p role="status" className="text-body-md text-outline mb-4">
        {products.length
          ? `${products.length} dịch vụ phù hợp`
          : "Chưa có khách sạn phù hợp với bộ lọc."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CatalogCollection
          collectionId="home-collection-2"
          productIds={products.map((p) => p.id)}
        >
          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-4"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-4"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-4" field="rating" />
                  </span>
                  <span className="text-sale-crimson font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-4"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-4" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"explore"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"beach_access"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-4">
                    <ProductField
                      id="home-4"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-5"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-5"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-5" field="rating" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-5"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-5" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"icecream"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"water_drop"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"cottage"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-5">
                    <ProductField
                      id="home-5"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-6"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-6"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-6" field="rating" />
                  </span>
                  <span className="text-primary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-6"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-6" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"surfing"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"theaters"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-6">
                    <ProductField
                      id="home-6"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-7"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-7"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-7" field="rating" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-7"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-7" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"spa"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"restaurant"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"villa"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-7">
                    <ProductField
                      id="home-7"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-8"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-8"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-8" field="rating" />
                  </span>
                  <span className="text-sale-crimson font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-8"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-8" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"beach_access"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"dining"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-8">
                    <ProductField
                      id="home-8"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-9"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-9"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-9" field="rating" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-9"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-9" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"beach_access"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"qr_code_2"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-9">
                    <ProductField
                      id="home-9"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-10"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-10"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-10" field="rating" />
                  </span>
                  <span className="text-primary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-10"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-10" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"beach_access"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"restaurant_menu"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-10">
                    <ProductField
                      id="home-10"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            productId="home-11"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-11"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                <ContentText contentKey="field-003" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-11" field="rating" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <ProductField
                  id="home-11"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md font-bold text-on-surface line-clamp-1"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-outline line-clamp-1 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] shrink-0">
                    {"location_on"}
                  </span>
                  <ProductValue id="home-11" field="location" />
                </p>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"visibility"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"pool"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-secondary">
                      {"free_breakfast"}
                    </span>
                    <span className="truncate">
                      <ContentText contentKey="field-007" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 flex items-end justify-between price-actions flex-wrap gap-3">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mb-1">
                  <span>
                    <ContentText contentKey="field-008" />
                  </span>
                  <span className="text-sale-crimson font-semibold">
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1 price-actions flex-wrap gap-3">
                  <PriceStack productId="home-11">
                    <ProductField
                      id="home-11"
                      field="price"
                      tag="span"
                      className="font-title-md text-title-md font-bold text-sale-crimson"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        <ContentText contentKey="field-010" />
                      </span>
                    </ProductField>
                  </PriceStack>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link"

                    data-action="details"
                  >
                    <ContentText contentKey="field-011" />
                  </ContentElement>
                </div>
              </div>
            </div>
          </CatalogCard>
        </CatalogCollection>
      </div>
    </section>
  );
}
