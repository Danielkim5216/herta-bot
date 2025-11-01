import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import getCharacter_core from '../core/getCharacter_core';

export const data = new SlashCommandBuilder()
    .setName('getcharacter')
    .setDescription('모든 캐릭터 정보를 확인합니다.');

export async function execute(interaction: ChatInputCommandInteraction) {
    getCharacter_core(interaction);
}