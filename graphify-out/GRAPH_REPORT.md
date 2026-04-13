# Graph Report - /Users/joelpedroche/Documents/Github/adsense-clone  (2026-04-13)

## Corpus Check
- 125 files · ~97,261 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10 nodes · 5 edges · 6 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_handleClick()|handleClick()]]
- [[_COMMUNITY_handleSave()|handleSave()]]
- [[_COMMUNITY_POST()|POST()]]
- [[_COMMUNITY_next-env.d|next-env.d]]
- [[_COMMUNITY_next.config|next.config]]
- [[_COMMUNITY_layout|layout]]

## God Nodes (most connected - your core abstractions)
1. `handler()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "handleClick()"
Cohesion: 0.67
Nodes (1): handler()

### Community 1 - "handleSave()"
Cohesion: 1.0
Nodes (0): 

### Community 2 - "POST()"
Cohesion: 1.0
Nodes (0): 

### Community 3 - "next-env.d"
Cohesion: 1.0
Nodes (0): 

### Community 4 - "next.config"
Cohesion: 1.0
Nodes (0): 

### Community 5 - "layout"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `handleSave()`** (2 nodes): `handleSave()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `POST()`** (2 nodes): `POST()`, `route.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next-env.d`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next.config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `layout`** (1 nodes): `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `handler()` connect `handleClick()` to `handleSave()`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._