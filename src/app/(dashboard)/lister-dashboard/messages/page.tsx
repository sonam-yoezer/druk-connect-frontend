"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  MapPin,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  UserRound,
} from "lucide-react";

type Message = {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  initials: string;
  avatar: string;
  listing: string;
  location: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Pema Dorji",
    initials: "PD",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    listing: "Bhutanese Catering",
    location: "Melbourne, VIC",
    lastMessage: "That sounds perfect. Can we confirm the menu?",
    time: "2m",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Tashi, I need catering for around 30 people for a family gathering next weekend.",
        time: "10:24 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Pema! Absolutely. I can cater for 30 people. Do you have any particular dishes in mind?",
        time: "10:27 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "We'd love some traditional Bhutanese dishes. Maybe ema datshi, phaksha paa and red rice?",
        time: "10:31 AM",
      },
      {
        id: 4,
        sender: "me",
        text: "Yes, I can prepare all three. I can also include a vegetarian option if needed.",
        time: "10:34 AM",
      },
      {
        id: 5,
        sender: "them",
        text: "That sounds perfect. Can we confirm the menu?",
        time: "10:38 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Karma Wangchuk",
    initials: "KW",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    listing: "Airport Pickup",
    location: "Sydney, NSW",
    lastMessage: "My flight arrives at 6:30 PM.",
    time: "1h",
    unread: 1,
    online: false,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi, would you be available for an airport pickup this Saturday?",
        time: "9:12 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Karma, yes I should be available. What time does your flight arrive?",
        time: "9:20 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "My flight arrives at 6:30 PM.",
        time: "9:23 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Sonam Choden",
    initials: "SC",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    listing: "Maths & Science Tutoring",
    location: "Brisbane, QLD",
    lastMessage: "Thank you, I'll see you on Monday.",
    time: "Yesterday",
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Would you be available for tutoring on Monday evening?",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes, Monday evening works for me.",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "them",
        text: "Thank you, I'll see you on Monday.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 4,
    name: "Tshering Lhamo",
    initials: "TL",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    listing: "Bhutanese Catering",
    location: "Melbourne, VIC",
    lastMessage: "Thanks for getting back to me.",
    time: "Mon",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi, I wanted to ask about catering options for a birthday.",
        time: "Monday",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Tshering. Unfortunately I'm already booked for that date.",
        time: "Monday",
      },
      {
        id: 3,
        sender: "them",
        text: "Thanks for getting back to me.",
        time: "Monday",
      },
    ],
  },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const value = search.toLowerCase();

    return CONVERSATIONS.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(value) ||
        conversation.listing.toLowerCase().includes(value) ||
        conversation.lastMessage.toLowerCase().includes(value),
    );
  }, [search]);

  const selectedConversation =
    filteredConversations.find(
      (conversation) => conversation.id === selectedId,
    ) ?? filteredConversations[0];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Communication
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Messages
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Keep conversations with people interested in your services in one
          place.
        </p>
      </section>

      {/* Messages workspace */}
      <section className="overflow-hidden border border-line bg-surface">
        <div className="grid min-h-[680px] lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Conversation list */}
          <aside
            className={`border-line lg:border-r ${
              selectedConversation ? "hidden lg:block" : "block"
            }`}
          >
            <div className="border-b border-line p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages..."
                  className="h-10 w-full rounded-md border border-line bg-background pl-9 pr-3 text-sm text-ink outline-none placeholder:text-faint focus:border-brand"
                />
              </div>
            </div>

            <div>
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    selected={conversation.id === selectedId}
                    onClick={() => setSelectedId(conversation.id)}
                  />
                ))
              ) : (
                <div className="px-5 py-12 text-center">
                  <p className="text-sm font-medium text-ink">
                    No conversations found
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Try a different search.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Active conversation */}
          {selectedConversation ? (
            <ConversationPanel
              conversation={selectedConversation}
              onBack={() => setSelectedId(0)}
            />
          ) : (
            <div className="hidden items-center justify-center lg:flex">
              <div className="text-center">
                <MessagePlaceholder />
                <h2 className="mt-4 font-serif text-xl font-medium text-ink">
                  Select a conversation
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Choose a conversation to view your messages.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ConversationItem({
  conversation,
  selected,
  onClick,
}: {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border-b border-line px-4 py-4 text-left transition-colors ${
        selected ? "bg-brand-tint" : "hover:bg-background"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative shrink-0">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          {conversation.online && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-jade" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-sm font-semibold text-ink">
              {conversation.name}
            </p>

            <span className="shrink-0 text-[10px] text-faint">
              {conversation.time}
            </span>
          </div>

          <p className="mt-0.5 truncate text-[11px] font-medium text-brand">
            {conversation.listing}
          </p>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p
              className={`truncate text-xs ${
                conversation.unread > 0 ? "font-medium text-ink" : "text-muted"
              }`}
            >
              {conversation.lastMessage}
            </p>

            {conversation.unread > 0 && (
              <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-semibold text-white">
                {conversation.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function ConversationPanel({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack: () => void;
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setMessage("");
  }

  return (
    <div className="flex min-h-[680px] flex-col">
      {/* Conversation header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-background hover:text-ink lg:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-ink">
                {conversation.name}
              </h2>

              {conversation.online && (
                <span className="h-1.5 w-1.5 rounded-full bg-jade" />
              )}
            </div>

            <p className="truncate text-xs text-muted">
              {conversation.listing}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background hover:text-ink"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      {/* Listing context */}
      <div className="border-b border-line bg-background px-5 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
              Listing
            </span>

            <span className="truncate text-xs font-medium text-ink">
              {conversation.listing}
            </span>

            <span className="hidden items-center gap-1 text-xs text-muted sm:flex">
              <MapPin className="h-3 w-3 text-faint" />
              {conversation.location}
            </span>
          </div>

          <a
            href="#"
            className="shrink-0 text-xs font-semibold text-brand hover:text-brand-dark"
          >
            View listing
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-8">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
            Today
          </span>
        </div>

        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-line bg-surface p-4 sm:p-5"
      >
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-faint transition-colors hover:bg-background hover:text-ink"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="mb-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-faint transition-colors hover:bg-background hover:text-ink sm:flex"
            aria-label="Add image"
          >
            <ImagePlus className="h-4 w-4" />
          </button>

          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message..."
              rows={1}
              className="max-h-32 min-h-10 w-full resize-none rounded-md border border-line bg-background px-3.5 py-2.5 pr-12 text-sm leading-5 text-ink outline-none placeholder:text-faint focus:border-brand"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMine = message.sender === "me";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] sm:max-w-[65%] ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-md px-4 py-3 ${
            isMine ? "bg-brand text-white" : "bg-background text-ink"
          }`}
        >
          <p className="text-sm leading-6">{message.text}</p>
        </div>

        <p
          className={`mt-1.5 text-[10px] text-faint ${
            isMine ? "text-right" : "text-left"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}

function MessagePlaceholder() {
  return (
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
      <UserRound className="h-5 w-5" />
    </div>
  );
}
