import { redirect } from 'next/navigation';
import { defaultLocale } from '../content/copy';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
