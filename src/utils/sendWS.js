import client from '@/utils/client';

export default function send(data) {
	client.send(JSON.stringify(data));
}
